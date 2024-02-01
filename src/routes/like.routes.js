import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { toggleCommentLike, toggleVideoLike } from "../controllers/like.controller.js";

const router = Router();

router.route("/v/:videoId").post(verifyJWT, toggleVideoLike)
router.route("/c/:commentId").post(verifyJWT, toggleCommentLike)


export default router