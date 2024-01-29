import { Router } from 'express'
import { createTweet } from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/tweets").post(verifyJWT, createTweet)


export default router