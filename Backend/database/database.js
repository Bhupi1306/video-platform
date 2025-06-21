import mongoose from "mongoose"

const connectDb = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Connected")
    } catch (error) {
        console.log("Database connection failed")
        exit(1)
    }
}

export{connectDb}