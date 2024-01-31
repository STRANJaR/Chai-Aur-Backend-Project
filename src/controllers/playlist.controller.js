import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Playlist } from "../models/playlist.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createPlaylist = asyncHandler( async(req, res) => {
    const { name, description } = req.body;
    

    if((name && description) === "") throw new ApiError(400, "title and description are required")

    const playlist = await Playlist.create(
        {
            name,
            description,
            owner: req.user?._id
        }
    )

    return res
    .status(201)
    .json( new ApiResponse(200, playlist, "Playlist created successfully"))

})



export {
    createPlaylist
}