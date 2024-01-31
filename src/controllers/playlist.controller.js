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


const deletePlaylist = asyncHandler( async(req, res) => {
    const { playlistId } = req.params;

    if(!playlistId) throw new ApiError(400, "Invalid playlist Id")

    const playlist = await Playlist.findByIdAndDelete(playlistId)

    if(!playlist) throw new ApiError(400, "something went wrong while deleting playlist")

    return res
    .status(200)
    .json( new ApiResponse(200, {}, "Playlist deleted successfully"))

    
})



const updatePlaylist = asyncHandler( async(req, res) => {
    const { name, description } = req.body;
    const { playlistId } = req.params;

    if(!(name && description)) throw new ApiError(400, "Plalist name and description are required")
    if(!playlistId) throw new ApiError(400, "Invalid playlist id")

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId, 
        {
            $set: {
                name,
                description
            }
        },
        {new: true}

    )

    return res
    .status(200)
    .json( new ApiResponse(200, playlist, "Playlist updated successfully"))


})
export {
    createPlaylist,
    getPlaylistById,
    deletePlaylist,
    updatePlaylist
}