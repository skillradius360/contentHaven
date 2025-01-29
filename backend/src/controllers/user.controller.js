import mongoose, { isValidObjectId } from "mongoose"
import {asyncHandler} from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { user } from "../models/user.models.js"
// import { isValidObjectId } from "mongoose"

const signUp= asyncHandler(async(req,res)=>{

    const {username,password,email} = req.body
console.log(username,password,email)
    if (!(username && password && email)) {
        throw new apiError(400, "creds not collected properly on signup")
    }
    
    const isExisted = await user.findOne({
        $or:[{username},{password}]
    })
    if(isExisted) throw new apiError(400,"user already exists!")
    const userData = await user.create({
        username:username,
        password:password,
        email:email
    })
    if(!userData) throw new apiError(400,"user registration failure!")
    
    const data = await user.findById(userData._id)

    return res.status(200).json(new apiResponse(200,data,"signUp successfully working"))
})


async function generateAccessAndRefreshToken(userId) {
    if (!isValidObjectId(userId)) throw new apiError(400, "invalid objectid for the user to generate the JWTs")
    const currentUser = await user.findById(userId)

    const accessToken = await currentUser.generateAccessToken()
    const refreshToken = await currentUser.generateRefreshToken()

    if (!accessToken && !refreshToken) {
        throw new apiError(400, "access or refreshToken failure ")
    }

    currentUser.refreshToken = refreshToken
    currentUser.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
}

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)

    if (!(email && password)) {
        throw new apiError(400, "email or password not entered properly")
    }
    const exists = await user.findOne(
        { email }
    )
    if (!exists) {
        throw new apiError(400, "user not exists.Please sign Up!")
    }

    const isPassword = await exists.comparePassword(password)
    console.log(isPassword)
    if (isPassword == false) throw new apiError(400, "password not correct!")

    const currentUserData = await user.findById(exists._id).select("-password ")
    if (!currentUserData) {
        throw new apiError(400, "cannot find current user .Failed to login")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(currentUserData._id)

    const Options = {
        httpOnly: true,
        secure: true,
        sameSite:"None"
    }

    return res.status(200)
        .cookie("accessToken", accessToken, { ...Options, maxAge: process.env.ACCESS_TOKEN_EXPIRY_S })
        .cookie("refreshToken", refreshToken, { ...Options, maxAge: process.env.REFRESH_TOKEN_EXPIRY_S })
        .json(new apiResponse(200, currentUserData, "login success!!"))

})



const logout = asyncHandler(async (req, res) => {
    const currentUser = req.User
    console.log(currentUser)
    if (!currentUser && !isValidObjectId(currentUser)) {
        throw new apiError("you are not logged in anymore or invalid")
    }
    const isUserValid = await user.findById(currentUser)
    if (!isUserValid) throw new apiError(400, "user not found ")

    isUserValid.refreshToken = null
    await isUserValid.save({ validateBeforeSave: false })

    const Options = {
        httpOnly: true,
        secure: true,
        sameSite:"None"
    }
    return res.clearCookie("accessToken", Options)
        .clearCookie("refreshToken", Options).json(

            new apiResponse(200, {}, `logout Successful for ${isUserValid.username}`)
        )

})

const getUserProfileData = asyncHandler(async (req, res) => {
    const currentUser = req.User

    if (!currentUser && !isValidObjectId(currentUser)) {
        throw new apiError(400, "user Invalid or not logged In")
    }

    const userData = await user.findById(currentUser).select("-password")

    if (!currentUser) {
        throw new apiError(400, "user does not exist or invalid user")
    }
    return res.status(200).json(new apiResponse(200, userData, "user found successfully"))

})

const isUserLoggedIn = asyncHandler(async (req, res) => {
    const currentUser = req.User
    if (!currentUser) {
        return res.status(200).json(new apiResponse(200, { userAuthorized: false }, "user logged in"))
    }
    return res.status(200).json(new apiResponse(200, { userAuthorized: true }, "user logged in"))
})

const sendCookies = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!isValidObjectId(id) && !id) throw new apiError(400, "bad id to throw cookies to")

    const validity = await user.findById(id)
    if (!validity) throw new apiError(400, "invalid id to fetch data from and send cookies")

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(validity._id)
    const Options = {
        httpOnly: true,
        secure: true,
        sameSite:"None"
    }
    return res.status(200).cookie("accessToken", accessToken, { ...Options, maxAge: process.env.ACCESS_TOKEN_EXPIRY_S })
        .cookie("refreshToken", refreshToken, { ...Options, maxAge: process.env.REFRESH_TOKEN_EXPIRY_S }).json(new apiResponse(200, "cookies fetched successfully"))
})

const clearCookies = asyncHandler(async (req, res) => {
    const Options = {
        httpOnly: true,
        secure: true,
        sameSite:"None"
    }
    return res.status(200).clearCookie("accessToken", Options).clearCookie("refreshToken", Options).json(new apiResponse(200, "cookies removed successfully"))
})
export {signUp,login,clearCookies,sendCookies,isUserLoggedIn,getUserProfileData,logout}