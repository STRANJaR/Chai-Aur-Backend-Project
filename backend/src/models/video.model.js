import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // cloudinary url
            required: false
        },
        thumbnail: {
            type: String, // cloudinary url
            required: true
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: false
        },
        views: {
            type: Number,
            default: 0
        },
        tags: {
            type: [String],
            default: []
        },
        category: {
            type: String,
            required: true
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    }, {timestamps: true}
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)