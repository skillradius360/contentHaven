import Router from "express"
import { uploadAVideo,
    getVideos,
    getSingleVideo,
    searchVideo
 } from "../controllers/video.controller.js"
import { upload } from "../middlewares/multer.middlewares.js"
export const videoRouter = Router()

videoRouter.route("/uploadVideo").post(upload.fields([
    {name:"videoFile",maxCount:1},{name:"titleImg",maxCount:1}
]),uploadAVideo)

videoRouter.route("/allVideos").get(getVideos)