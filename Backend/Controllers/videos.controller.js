import { Category } from "../Models/category.model.js"
import { User } from "../Models/User.model.js"
import { Video } from "../Models/video.model.js"

const videoUpload = async (req, res) => {
    try {
        const {title, description, categoryId, url, userEmail, thumbnail} = req.body

        if(!title || !description || !categoryId || !url || !userEmail)
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


export{
    videoUpload
}

