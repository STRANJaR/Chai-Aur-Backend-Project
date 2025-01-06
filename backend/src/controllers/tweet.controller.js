import { Tweet } from "../models/tweet.model.js"
import mongoose, { isValidObjectId } from "mongoose"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


// ***CREATE TWEET 
const createTweet = asyncHandler(async (req, res) => {
    /* // ALGORITHM FOR CREATE TWEETS 
 
     step 1: request the content from user 
     step 2: check if empty content 
     step 3: save the content in the tweet model 
     const {content} = req.body
     */

    // step 1: request the content form user 
    const { content } = req.body

    // step 2: check if empty content
    if (!content) throw new ApiError(400, "Please write something...")

    const tweet = await Tweet.create(
        {
            content,
            owner: req.user?._id
        }
    )

    if (!tweet) throw new ApiError(400, "something went wrong while creating tweet")

    return res
        .status(201)
        .json(
            new ApiResponse(200, tweet, "Tweet created successfully ")
        )
})


// ***UPDATE TWEET 
const updateTweet = asyncHandler(async (req, res) => {
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

    if (!tweetId) throw new ApiError(400, "Invalid tweetId")

    if (!content) throw new ApiError(400, "content is required")

    const tweet = await Tweet.findById(tweetId)

    if (!tweet) throw new ApiError(400, "tweed id not found")
    const newTweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set: {
                content
            }
        },
        { new: true }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(200, newTweet, "Tweet updated successfully")
        )
})



// ***DELETE TWEET 
const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params

    if (!tweetId) throw new ApiError(400, "tweet id not found")

    const tweet = Tweet.findById(tweetId)

    if (!tweet) throw new ApiError(400, "tweet id not found")

    await Tweet.findByIdAndDelete(tweetId)

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Tweet deleted successfully ")
        )
})


// GET SINGLE TWEET

const getSingleTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    if (!tweetId) throw new ApiError(400, "tweet id not found")

    try {
        const tweet = await Tweet.findById(tweetId)

        if (!tweet) throw new ApiError(400, "tweet id not found")

        return res
            .status(200)
            .json(
                new ApiResponse(200, tweet, "Tweet fetched successfully")
            )
    } catch (error) {
        console.log('Error while fetching tweet: ', error)
        throw new ApiError(400, "something went wrong while fetching the tweet")
    }
})


// GET ALL TWEETS OF USER 
const getUserTweets = asyncHandler(async (req, res) => {

    const { userId } = req.params;

    const userAllTweets = await Tweet.aggregate(
        [
            {
                $match: {
                    owner: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "ownerDetails",
                    pipeline: [
                        {
                            $project: {
                                username: 1,
                                avatar: 1,
                            }
                        }
                    ]
                }
            },
            {
                $addFields: {
                    ownerDetails: {
                        $first: "$ownerDetails"
                    }
                }
            },
            {
                $project: {
                    content: 1,
                    ownerDetails: 1,
                    createdAt: 1
                }
            }
        ]
    )

    if (!userAllTweets) throw new ApiError(400, "something went wrong while fetching the tweets")

    return res
        .status(200)
        .json(new ApiResponse(200, userAllTweets, "Tweets fetched successfully"))
})
export {
    createTweet,
    updateTweet,
    deleteTweet,
    getUserTweets,
    getSingleTweet
}