import { Tweet } from "../models/tweet.model.js"
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
    const { content, user } = req.body
    // const { user } = req.cookies

    // step 2: check if empty content
    if(!content) throw new ApiError(400, "Please write something...")

    const tweet = await Tweet.create({
        content,
        user

    })

    if(!tweet) throw new ApiError(400, "something went wrong while creating tweet")

    return res
    .status(201)
    .json(
        new ApiResponse(200, user, "Tweet created successfully ")
    )
})


export {
    createTweet
}