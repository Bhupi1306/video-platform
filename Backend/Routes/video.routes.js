import { Router } from "express";
import { videoUpload } from "../Controllers/videos.controller.js";

const videoRoutes = Router()

videoRoutes.post('/upload',videoUpload)

export default videoRoutes