import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    createPlaylist, 
    deletePlaylist, 
    getPlaylistById, 
    updatePlaylist 
} from "../controllers/playlist.controller.js";

const router = Router();

router.route("/").post(verifyJWT, createPlaylist)
router.route("/get-playlist/:playlistId").get(verifyJWT, getPlaylistById)
router.route("/delete-playlist/:playlistId").delete(verifyJWT, deletePlaylist)
router.route("/update-playlist/:playlistId").patch(verifyJWT, updatePlaylist)


export default router