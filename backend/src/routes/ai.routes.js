import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { aiGeneratedThumbnail } from "../controllers/ai.controller.js";


const router = Router();

router.route('/image-generate').post(verifyJWT, aiGeneratedThumbnail)


export default router