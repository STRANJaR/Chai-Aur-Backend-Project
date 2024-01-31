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


const getPlaylistById = asyncHandler( async(req, res) => {
    const { playlistId } = req.params;

    if(!playlistId) throw new ApiError(400, "Invalid playlist id")

    const playlist = await Playlist.findById(playlistId)

    if(!playlist) throw new ApiError(400, "Playlist not found")

    return res
    .status(200)
    .json( new ApiResponse(200, playlist, "Playlist found successfully"))

})

export {
    createPlaylist,
    getPlaylistById
}