import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    deleteVideo, 
    updateVideo, 
    uploadVideo,
    getAllVideos,
    getSingleVideo
} from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { generateAiImage, generateDescriptionForVideo } from "../utils/openaiImageGenerate.js";

const router = Router()

router.route("/").post(verifyJWT,upload.fields
    ([
        {
            name: "videoFile",
            maxCount: 1
        },
        // TODO: work on thumbnail upload along with video 
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]), uploadVideo
)

router.route("/delete-video/:videoId").delete(verifyJWT, deleteVideo)
router.route("/update-video/:videoId").patch(verifyJWT, upload.fields([
    {
        name: "thumbnail",
        maxCount: 1
    }
]), updateVideo)

router.route("/get-all-videos").get(verifyJWT, getAllVideos)
router.route("/get-single-video").post(verifyJWT, getSingleVideo)

// AI Thumbnail generation...
router.route("/generate-thumbnail").post(verifyJWT, generateAiImage)
router.route("/generate-description").post(verifyJWT, generateDescriptionForVideo)


export default router