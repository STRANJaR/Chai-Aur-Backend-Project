import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    addComment, deleteComment

} from '../controllers/comment.controller.js'
const router = Router();


router.route("/:videoId").post(verifyJWT, addComment)
router.route("/delete-comment/:commentId").delete(verifyJWT, deleteComment)

export default router