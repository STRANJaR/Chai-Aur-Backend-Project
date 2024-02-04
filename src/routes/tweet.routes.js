import { Router } from 'express'
import { 
    createTweet, 
    deleteTweet, 
    getUserTweets, 
    updateTweet 
} from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/").post(verifyJWT, createTweet)
router.route("/:tweetId").patch(verifyJWT, updateTweet).delete(verifyJWT, deleteTweet)
router.route("/user-tweets/:userId").get(verifyJWT, getUserTweets)
export default router