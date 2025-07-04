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

    department: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },

    publicId: {
        type: String,
        required: true
    },

    thumbnail: {
        type: String
    },

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

}, {timestamps: true})

export const Video = mongoose.model("Video", videoSchema)