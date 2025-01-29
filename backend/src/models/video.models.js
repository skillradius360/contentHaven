import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    videoURI:{
        type:String,
        required:true
    },
    templateImg:{
        type:String
    },
    description:{
        type:String
    },
    releaseDate:{
        type:String
    },
    cast:{
        type:String
    },
    trailerLink:{
        type:String
    }
})

export const video= mongoose.model("video",videoSchema)