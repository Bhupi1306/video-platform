import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true, 
    }
})

export const Category = mongoose.model("Category", categorySchema)