import { Router } from "express"
import { login, signUp } from "../controllers/user.controller.js"

 const userRouter = Router()


 userRouter.route("/signUp").post(signUp)  
userRouter.route("/login").get(login)

export {userRouter}