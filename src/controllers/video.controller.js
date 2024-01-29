import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const uploadVideo = asyncHandler( async(req, res) => {
    const { title, description } = req.body;
    const  videoLocalPath  = req.files?.videoFile[0]?.path;
    const  thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    if(!videoLocalPath) throw new ApiError(400, "Invalid url of video")
    if(!thumbnailLocalPath) throw new ApiError(400, "Invalid url of thumbnail")

    const videoFile = await uploadOnCloudinary(videoLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if(!videoFile) throw new ApiError(400, "Faild to upload video on cloudinary")
    if(!thumbnail) throw new ApiError(400, "Faild to upload thumbnail on cloudinary")
console.log(videoFile)
    const video = await Video.create(
        {
            videoFile: videoFile.url,
            thumbnail: thumbnail.url,
            title,
            description,
            duration: null,
            views: null,
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