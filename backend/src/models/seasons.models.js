import mongoose from "mongoose"
const seasonSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    videoURI:{
        type:String
    },
    seasonNo:{
        type:Number,
        default:1
    }

},{timestamps:true})
export const seasons = mongoose.model("seasons",seasonSchema)