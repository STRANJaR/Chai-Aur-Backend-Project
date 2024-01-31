import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createPlaylist, deletePlaylist, getPlaylistById } from "../controllers/playlist.controller.js";

const router = Router();

router.route("/").post(verifyJWT, createPlaylist)
router.route("/get-playlist/:playlistId").get(verifyJWT, getPlaylistById)
router.route("/delete-playlist/:playlistId").delete(verifyJWT, deletePlaylist)


export default router