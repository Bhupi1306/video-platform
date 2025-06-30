import { Router } from "express";
import { deleteVideo, editVideo, getVideos, videoUpload } from "../Controllers/videos.controller.js";

const videoRoutes = Router()

videoRoutes.post('/upload',videoUpload)
videoRoutes.get('/get',getVideos)
videoRoutes.post('/edit', editVideo)
videoRoutes.post('/delete', deleteVideo)

export default videoRoutes