import { Router } from "express";
import { editVideo, getVideos, videoUpload } from "../Controllers/videos.controller.js";

const videoRoutes = Router()

videoRoutes.post('/upload',videoUpload)
videoRoutes.get('/get',getVideos)
videoRoutes.post('/edit', editVideo)

export default videoRoutes