import mongoose, { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Like } from "../models/like.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const toggleVideoLike = asyncHandler( async(req, res) => {
    const { videoId } = req.params;

    if(!isValidObjectId(videoId)) throw new ApiError(400, "Invalid video id")

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
        .json( new ApiResponse(200, "Unliked video successfully"))
    }

    await Like.create(
        {
            video: videoId,
            likedBy: req.user?._id
        }
    )


    return res
    .status(201)
    .json( new ApiResponse(200, {} ,"Video liked successfully"))

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
export {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike
}