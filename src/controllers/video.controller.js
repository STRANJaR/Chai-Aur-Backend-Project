import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const uploadVideo = asyncHandler( async(req, res) => {
    // Algorithm while uploading video 
    // step 1: requirement of title, desc, and views from user (req.boyd)
    // step 2: check for title and description !empty
    // step 3: find video and thumbnail objec after uploading on multer middleware
    // step 4: check for video and thumbnail objects are exists or not 
    // step 5: upload it (video and thumbnail) on cloudinary 
    // step 6: check video and thumbnail are uploaded 
    // step 7: create video object in DB 
    // step 8: return response 

    const { title, description, views } = req.body;
    const  videoLocalPath  = req.files?.videoFile[0]?.path;
    const  thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    if(!videoLocalPath) throw new ApiError(400, "Invalid url of video")
    if(!thumbnailLocalPath) throw new ApiError(400, "Invalid url of thumbnail")

    const videoFile = await uploadOnCloudinary(videoLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if(!videoFile) throw new ApiError(400, "Faild to upload video on cloudinary")
    if(!thumbnail) throw new ApiError(400, "Faild to upload thumbnail on cloudinary")

    const video = await Video.create(
        {
            videoFile: videoFile.url,
            thumbnail: thumbnail.url,
            title,
            description,
            duration: videoFile.duration,
            views,
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


export {
    uploadVideo
}