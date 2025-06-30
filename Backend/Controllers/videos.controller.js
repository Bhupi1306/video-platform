import { Category } from "../Models/category.model.js"
import { User } from "../Models/User.model.js"
import { Video } from "../Models/video.model.js"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime.js"
import {v2 as cloudinary} from "cloudinary"

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
)

function getPublicIdFromUrl(url) {
  const parts = url.split('/');
  const fileWithExt = parts.pop(); // e.g., hehml8ljpko4kxnmifru.mp4
  const versionOrFolder = parts.pop(); // e.g., v1719508200

  const filename = fileWithExt.split('.')[0]; // remove extension
  const folder = parts.pop(); // e.g., Nirmaan

  return `${folder}/${filename}`;
}


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

        if(!tempVideos) 
            return res.status(500).json({message: "No videos found" , success: false})

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

        if( !id || !title || !description || !department || !category)
            return res.status(200).json({message: "All fields are required", success: false})
        

        const fullCategory = await Category.findOne({id:category})

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

const deleteVideo = async(req,res) => {
    try {
        const {id} = req.body
        if(!id)
            return res.status(400).json({message: "Id is required", success:false})

        const videoId = await Video.findOne({id})


        const result = await cloudinary.uploader.destroy(videoId.publicId, {
            resource_type: 'video'
        })

        const thumbnail = videoId.thumbnail
        if(thumbnail){
            const url = getPublicIdFromUrl(thumbnail)
            await cloudinary.uploader.destroy(url, {
            resource_type: 'image'
        })
        }
        
        if(result.result !== 'ok')
            return res.status(500).json({message: "Something went wrong", success: false, result})
        else 
        {
            await Video.findOneAndDelete({id})
            return res.status(200).json({message: "Video deleted successfully", success: true})
        }
    } catch (error) {
        return res.status(500).json({message: "Something went Wrong", success: false, error})
    }
}



export{
    videoUpload,
    getVideos,
    editVideo,
    deleteVideo
}

