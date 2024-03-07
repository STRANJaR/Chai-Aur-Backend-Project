import mongoose from "mongoose";
import {asyncHandler }from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js"

const addComment = asyncHandler( async(req, res) => {
    const { content } = req.body;
    const { videoId } = req.params

    if(!content) throw new ApiError(400, "Comment is required")

    if(!videoId) throw new ApiError(400, "Invalid Video Id")

    const comment = await Comment.create(
        {
            content,
            owner: req.user?._id,
            video: videoId
        }
    )

    if(!comment) throw new ApiError(400, "something went wrong while adding comment")

    return res
    .status(201)
    .json( new ApiResponse(200, comment, "Comment added successfully"))
    
}) 


const deleteComment = asyncHandler( async(req, res) =>{
    const { commentId } = req.params;

    if(!commentId) throw new ApiError(400, "Invalid comment id")

    await Comment.findByIdAndDelete(commentId)

    return res
    .status(200)
    .json( new ApiResponse(200, {}, "Comment deleted successfully"))
})



const updateComment = asyncHandler( async(req, res) => {
    const { content } = req.body;
    const { commentId } = req.params;

    if(!content) throw new ApiError(400, "comment is required")
    if(!commentId) throw new ApiError(400, "Invalid comment id")

    const newComment = await Comment.findByIdAndUpdate(
        commentId,
        {
            $set: {
                content
            }
        },
        {new: true}
    )
  
    return res
    .status(200)
    .json( new ApiResponse(200, newComment, "Comment Updated successfully"))

})


const getVideoComments = asyncHandler(async(req, res) => {
    const { videoId } = req.params;

    const video = await Video.findById(videoId)
    if(!video) throw new ApiError(404, "Video not found")

    const comments = await Comment.aggregate(
        [
            {
                $match: {
                    video: new mongoose.Types.ObjectId(videoId)
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
                                fullName: 1,
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
                $project:{
                    content: 1,
                    createdAt: 1,
                    ownerDetails: 1
                }
            }
        ]
    )


    if(!comments) throw new ApiError(400, "something went wrong while fetching comments")

    return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"))
})

export {
    addComment,
    deleteComment,
    updateComment,
    getVideoComments
}