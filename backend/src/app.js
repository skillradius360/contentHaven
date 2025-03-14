import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(express.json({
    limit:"16kb"

}))
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))
app.use(cookieParser())

app.use(express.static("./public"))
app.use(cors({origin:"*"}))

import { userRouter } from "./routes/user.routes.js"
import { videoRouter } from "./routes/video.routes.js"

app.use("/users",userRouter)
app.use("/videos",videoRouter)


export {app}