import { Router } from 'express'
import { 
    createTweet, 
    updateTweet 
} from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/").post(verifyJWT, createTweet)
router.route("/:tweetId").patch(verifyJWT, updateTweet)

export default router