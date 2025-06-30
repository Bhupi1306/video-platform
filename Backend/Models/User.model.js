import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    id: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true, 
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
})

export const User = mongoose.model("User", userSchema)