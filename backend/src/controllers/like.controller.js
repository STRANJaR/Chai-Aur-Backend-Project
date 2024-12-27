import mongoose, { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Like } from "../models/like.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/video.model.js";


const toggleVideoLike = asyncHandler( async(req, res) => {
    const { videoId } = req.params;

    if(!isValidObjectId(videoId)) throw new ApiError(400, "Invalid video id")

    try {
        // If user already liked the video 
            const alreadyLiked = await Like.findOne(
                {
                    video: videoId,
                    likedBy: req.user?._id
                }
            )
    
            if(alreadyLiked){
                await Like.findByIdAndDelete(videoId) 
    
                return res
                .status(200)
                .json( new ApiResponse(200, {message: 'Unliked the video', liked: false }))
            }
    
        await Like.create(
            {
                video: videoId,
                likedBy: req.user?._id
            }
        )
    
    
        return res
        .status(201)
        .json( new ApiResponse(200, {} ,"Liked the video"))
        
    } catch (error) {
        console.error('Error liking/unliking video:', error);
        return res.status(500).json({ message: 'Server error' });
    }

})


const toggleCommentLike = asyncHandler( async(req, res) =>{
    const { commentId } = req.params;

    if(!isValidObjectId(commentId)) throw new ApiError(400, "Invalid comment id ")

    // If already liked comment
    
    const alreadyLiked = await Like.findOne(
        
                {
                    comment: commentId,
                    likedBy: req.user?._id
                }
    )

    if(alreadyLiked){
        await Like.findByIdAndDelete(commentId)

        return res
        .status(200)
        .json( new ApiResponse(200, {}, "Unliked comment successfully"))
    }

    const likedComment = Like.create(
        {
            comment: commentId,
            likedBy: req.user?._id
        }
    )
    
    if(!likedComment) throw new ApiError(400, "something went wrong while adding like")

    return res
    .status(201)
    .json( new ApiResponse(200, likedComment, "Comment liked Successfully"))

})


const toggleTweetLike = asyncHandler( async(req, res) => {
    const { tweetId } = req.params;

    if(!isValidObjectId(tweetId)) throw new ApiError(400, "Invalid comment id")

    // If tweet already liked
    const alreadyLikedTweet = Like.findOne(
        {
            tweet: tweetId,
            likedBy: req.user?._id
        }
    )

    if(!alreadyLikedTweet) throw new ApiError(400, "Tweet not found")

    if(alreadyLikedTweet){
        await Like.findByIdAndDelete(tweetId)

        return res
        .status(200)
        .json( new ApiResponse(200, {}, "Tweet unliked successfully"))
    }
    await Like.create(
        {
            tweet: tweetId,
            likedBy: req.user?._id
        }
    )

    return res
    .status(201)
    .json( new ApiResponse(200, {}, "Tweet liked successfully"))

})


const getAllLikedVideos = asyncHandler(async(req, res) => {
    const likedVideo = await Like.aggregate(
        [
            {
                $match: {
                    likedBy: new mongoose.Types.ObjectId(req.use?._id)
                }
            },
            {
                $lookup: {
                    from: "videos",
                    localField: "video",
                    foreignField: "_id",
                    as: "likedVideos",

                    pipeline: [
                        {
                            $lookup: {
                                from: "users",
                                localField: "owner",
                                foreignField: "_id",
                                as: "ownerDetails"
                            }
                        },
                        {
                            $unwind: "$ownerDetails"
                        }
                    ]
                }

            },
            {
                $unwind: "$likedVideo"
            },
            {
                $sort: {
                    createdAt: -1,
                    
                }
            },
            {
                $project: {
                    _id: 0,
                    likedVideo: {
                        _id: 1,
                        "videoFile.url": 1,
                        "thumbnail.url": 1,
                        owner: 1,
                        description: 1,
                        duration: 1,
                        views: 1,
                        isPublished: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        ownerDetails: {
                            username: 1,
                            fullName: 1,
                            "avatar.url": 1
                        }
                    }
                }
            }
        ]
    )

    return res
    .status(200)
    .json(new ApiResponse(200, likedVideo, "Liked videos fetched successfully"))
})



export {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getAllLikedVideos   
}