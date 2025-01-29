import Router from "express"
import { uploadAVideo } from "../controllers/video.controller.js"
import { upload } from "../middlewares/multer.middlewares.js"
export const videoRouter = Router()

videoRouter.route("/uploadVideo").post(upload.fields([
    {name:"videoFile",maxCount:1}
]),uploadAVideo)

