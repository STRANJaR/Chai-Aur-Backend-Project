import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    toggleCommentLike, 
    toggleTweetLike, 
    toggleVideoLike 
} from "../controllers/like.controller.js";

const router = Router();

router.route("/v/:videoId").post(verifyJWT, toggleVideoLike)
router.route("/c/:commentId").post(verifyJWT, toggleCommentLike)
router.route("/t/:tweetId").post(verifyJWT, toggleTweetLike)


export default router