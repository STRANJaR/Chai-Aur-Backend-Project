import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { generateImage } from "../utils/runwayImageGeneration.js";


const router = Router();

router.route('/image-generate').post(verifyJWT, generateImage)


export default router