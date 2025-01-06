import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ffmpegVideoTranscode } from "../utils/ffmpegTranscoding.js";
import { generateAiImage } from "../utils/openaiImageGenerate.js";


const uploadVideo = asyncHandler(async (req, res) => {
    // Algorithm while uploading video 
    // step 1: requirement of title, desc, and views from user (req.boyd)
    // step 2: check for title and description !empty
    // step 3: find video and thumbnail objec after uploading on multer middleware
    // step 4: check for video and thumbnail objects are exists or not 
    // step 5: upload it (video and thumbnail) on cloudinary 
    // step 6: check video and thumbnail are uploaded 
    // step 7: create video object in DB 
    // step 8: return response 

    const { title, description, views, category, tags } = req.body;


    const videoLocalPath = req.files?.videoFile[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    if (!videoLocalPath) throw new ApiError(400, "Invalid url of video")
    if (!thumbnailLocalPath) throw new ApiError(400, "Invalid url of thumbnail")


    const videoUrl = await ffmpegVideoTranscode(videoLocalPath)
    console.log('videoUrl : ', videoUrl)




    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    // if (!videoFile) throw new ApiError(400, "Faild to upload video on AWS")
    if (!thumbnail) throw new ApiError(400, "Faild to upload thumbnail on cloudinary")

    const video = await Video.create(
        {
            videoFile: videoUrl,
            thumbnail: thumbnail.url,
            title,
            description,
            duration: 0,
            views,
            tags,
            category,
            isPublished: true,
            owner: req.user?._id

        }
    )

    return res
        .status(201)
        .json(
            new ApiResponse(200, video, "Video Uploaded successfully")
        )

})


const deleteVideo = asyncHandler(async (req, res) => {
    // Algorithm while  delete video 
    // step 1: find video id which want to delete 
    // step 2: validation of video id 
    // step 3: find in db and delete them 
    // step 4: validate video deleted or not 
    // step 5: return response 

    const { videoId } = req.params;

    if (!videoId) throw new ApiError(400, "Invalid video id")

    const deletedVideo = await Video.findByIdAndDelete(videoId)

    if (!deletedVideo) throw new ApiError(400, "something went wrong while deleting the video")

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Video deleted successfully"))

})


const updateVideo = asyncHandler(async (req, res) => {
    // Algorithm while update video fields
    // step 1: requirement of content form user like title, description
    // step 2: check for which field want to be update 
    // step 3: find video by id in db 
    // step 4: check video exist in db or not 
    // step 5: set the recuired update fields in db 
    // step 6: check for updated object 
    // step 7: return response 

    const { title, description, userThumbnailPrompt } = req.body;
    const { videoId } = req.params;

    if (!(title && description)) throw new ApiError(400, "title and description are required")

    if (!videoId) throw new ApiError(400, "Invalid video id")

    const localThumbnailPath = req.files?.thumbnail[0]?.path;
    if (!localThumbnailPath) throw new ApiError(400, "Invalid thumbnail url")

    if (userThumbnailPrompt) {
        const aiGeneratedThumbnail = await generateAiImage(userThumbnailPrompt)
        console.log(`AI Generated Thumbnail:`, aiGeneratedThumbnail)
    }

    const uploadedThumbnail = await uploadOnCloudinary(localThumbnailPath)
    if (!uploadedThumbnail) throw new ApiError(400, "something went wrong while updating thumbnail ")

    const video = await Video.findById(videoId)
    if (!video) throw new ApiError(400, "video not found in db")

    const updatedVideoContent = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                title,
                description,
                thumbnail: uploadedThumbnail.url
            }
        },
        { new: true }
    )

    if (!updatedVideoContent) throw new ApiError(400, "something went wrong while updating the video content")

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedVideoContent, "Video updated successfully ")
        )
})


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 9 } = req.query;
    try {

        const videos = await Video.aggregate(
            [
                {
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "ownerDetails"
                    }
                },
                //OPTIMIZE: change the data type of owenerDetails from array to object 
                // {
                //     $addFields: {
                //         ownerDetails: {
                //             $arrayElemAt: ["$owenerDetails", 0]
                //         }
                //     }
                // }

            ]
        )
            .skip((page - 1) * limit)
            .limit(Number(limit))

        const totalVideos = await Video.countDocuments();

        return res
            .status(200)
            .json(new ApiResponse(
                200,
                {
                    totalVideos,
                    videos,
                    currentPage: page,
                    totalPages: Math.ceil(totalVideos / limit)
                },
                "Videos fetched successfully"
            ))
    } catch (error) {
        throw new ApiError(500, 'Error fetching all videos', error)
    }
})


const getSingleVideo = asyncHandler(async (req, res) => {
    const { id } = req.body;

    const singleVideo = await Video.findById(id)

    const creatorInfo = await Video.aggregate(
        [
            {
                $lookup: {
                    from: 'users',
                    localField: 'owner',
                    foreignField: '_id',
                    as: 'creatorDetails'
                }
            }
        ]
    )

    if (!singleVideo) throw new ApiResponse(404, {}, 'video not found')

    return res
        .status(200)
        .json(new ApiResponse(200, { singleVideo, creatorInfo }, 'video fetched successfully'))
})



const searchVideos = asyncHandler(async (req, res) => {
    const { query } = req.query;
    console.log("server query: ", query)

    if (!query) throw new ApiError(400, "Invalid search query")

    try {
        const videos = await Video.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { tags: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } }
            ]
        }).exec()

        if (!videos) throw new ApiResponse(404, {}, 'No videos found')

        return res
            .status(200)
            .json(new ApiResponse(200, videos, 'Videos fetched successfully'))
    } catch (error) {
        throw new ApiError('Error in search videos', error)
    }

})


export {
    uploadVideo,
    deleteVideo,
    updateVideo,
    getAllVideos,
    getSingleVideo,
    searchVideos
}