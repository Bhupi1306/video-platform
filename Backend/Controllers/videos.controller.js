import { Category } from "../Models/category.model.js"
import { User } from "../Models/User.model.js"
import { Video } from "../Models/video.model.js"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime.js"

const videoUpload = async (req, res) => {
    try {
        const {title, description, department, categoryId, url, publicId, userEmail, thumbnail} = req.body

        if(!title || !description || !department || !categoryId || !url || !userEmail || !publicId)
            return res.status(400).json({message: "All fields are required", success: false})

        const foundCategory = await Category.findOne({id:categoryId})

        if(!foundCategory) 
            return res.status(400).json({message: "Category does not exist", success: false})

        const uploadedByUser = await User.findOne({email: userEmail})

        if(!uploadedByUser)
            return res.status(400).json({message: "User not found", success: false})
        
        const newVideo = new Video({
            id: Date.now(),
            title,
            description,
            url,
            department,
            publicId,
            uploadedBy: uploadedByUser,
            category: foundCategory,
            thumbnail: thumbnail || ""
        })

        const createdVideo = await newVideo.save()
        if(createdVideo){
            return res.status(201).json({message: "Video Uploaded Successfully", success: true})}
        else
            return res.status(500).json({message: "Something went wrong", success: false})

    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", success: false, error})
    }
}

const getVideos = async (req,res) => {
    try {
        dayjs.extend(relativeTime)
        const tempVideos = await Video.find({}).populate('category')

        const videos = tempVideos.map((video)=>{
            const obj = video.toObject()
            obj.relativeTime = dayjs(video.createdAt).fromNow()
            return obj
        })


        return res.status(200).json({message:"fetched videos successfully", success: true, videos})


    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const editVideo = async(req,res) => {
    try {
        const {id, title, description, department, category, thumbnail} = req.body

        const fullCategory = await Category.findOne({category})

        const editedVideo = await Video.findOneAndUpdate({id},{$set: {
            title,
            description,
            department,
            category: fullCategory,
            thumbnail
        }})

        if(editedVideo)
            return res.status(200).json({message: "Video Edited Successfully", success:true})
        return res.status(500).json({message: "Something went Wrong", success: false})
    } catch (error) {
        return res.status(500).json({message: "Something went Wrong", success: false, error})
    }
}


export{
    videoUpload,
    getVideos,
    editVideo
}

