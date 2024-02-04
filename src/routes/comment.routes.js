import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    addComment, 
    deleteComment, 
    getVideoComments, 
    updateComment

} from '../controllers/comment.controller.js'
const router = Router();


router.route("/:videoId").post(verifyJWT, addComment)
router.route("/delete-comment/:commentId").delete(verifyJWT, deleteComment)
router.route("/update-comment/:commentId").patch(verifyJWT, updateComment)
router.route("/all-comments/:videoId").get(verifyJWT, getVideoComments)

export default router