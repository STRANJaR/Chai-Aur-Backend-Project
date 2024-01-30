import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { deleteVideo, uploadVideo } from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/").post(verifyJWT,upload.fields
    ([
        {
            name: "videoFile",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]), uploadVideo
)

router.route("/delete-video/:videoId").delete(verifyJWT, deleteVideo)


export default router