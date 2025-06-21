import mongoose from "mongoose"

const videoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },

    title: {
        type: String,
        required: true, 
    },

    description: {
        type: String,
        required: true,
    },

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
})

export const Video = mongoose.model("Video", videoSchema)