import Router from "express"
import { uploadAVideo,
    getVideos,
    getSingleVideo,
    searchVideo,
    uploadTV,
    uploadSeasons
 } from "../controllers/video.controller.js"
import { upload } from "../middlewares/multer.middlewares.js"
export const videoRouter = Router()

videoRouter.route("/uploadVideo").post(upload.fields([
    {name:"videoFile",maxCount:1},{name:"titleImg",maxCount:1}
]),uploadAVideo)

videoRouter.route("/allVideos").get(getVideos)
videoRouter.route("/searchVideos").get(searchVideo)
videoRouter.route("/addAShow").post(uploadTV)
videoRouter.route("/addAEpisode").post(upload.fields([
    {name:"videoFile",maxCount:1}
]),uploadSeasons)