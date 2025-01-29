import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    fullName:{
        type:String,
        default:"JohnDoe"
    },
    history:{
        type:[mongoose.Types.ObjectId],
        ref:"video"
    },
    refreshToken:{
        type:String
    }

})

userSchema.pre("save",async function(next){
try {
    if(!this.isModified("password")){
        return next()
    }
        this.password= await bcrypt.hash(this.password,9)
        next()
} catch (error) {
    console.error("problem during password hashing",error)
}    
})


userSchema.methods.comparePassword= async function(pass){
    if(!pass) console.log("no password passed!!")
try {
    return await bcrypt.compare(pass,this.password)
} catch (error) {
    throw new Error("password comparison failure")
}} 

userSchema.methods.generateAccessToken =  function(){
    return  jwt.sign({
        _id:this._id,
        password:this.password,
        username:this.password
    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
)}


userSchema.methods.generateRefreshToken = function(){
    return  jwt.sign({
        _id:this._id,
        password:this.password,
    },process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
)
}


export const user = mongoose.model("user",userSchema)