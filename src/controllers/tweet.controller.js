import { Tweet } from "../models/tweet.model.js"
import mongoose, { isValidObjectId } from "mongoose"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"



const createTweet = asyncHandler( async(req, res)=>{
   /* // ALGORITHM FOR CREATE TWEETS 

    step 1: request the content from user 
    step 2: check if empty content 
    step 3: save the content in the tweet model 
    const {content} = req.body
    */

    // step 1: request the content form user 
    const { content } = req.body

    // step 2: check if empty content
    if(!content) throw new ApiError(400, "Please write something...")

    const tweet = await Tweet.create(
       {
        content,
        owner: req.user?._id
       }
    )

    if(!tweet) throw new ApiError(400, "something went wrong while creating tweet")

    return res
    .status(201)
    .json(
        new ApiResponse(200, tweet, "Tweet created successfully ")
    )
})


const updateTweet = asyncHandler( async(req, res) => {
    // Algorithm while updating the tweet 

    // step 1: requirement of tweet id - in params 
    // step 2: requirement of new content - in body
    // step 3: chek tweetId and content are exist or not 
    // step 4: find the tweet in the db 
    // step 5: check if tweet exist in db or not 
    // step 6: update the tweet content 
    // step 7: return the response 

    const { tweetId } = req.params
    const { content } = req.body

    if(!tweetId) throw new ApiError(400, "Invalid tweetId")

    if(!content) throw new ApiError(400, "content is required")

    const tweet = await Tweet.findById(tweetId)

    const newTweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set: {
                content
            }
        },
        {new: true}
    )

    return res
    .status(200)
    .json(
        new ApiResponse(200, newTweet, "Tweet updated successfully")
    )
}) 

export {
    createTweet,
    updateTweet
}