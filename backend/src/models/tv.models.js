import mongoose from "mongoose"




const tvSchema = new mongoose.Schema ({
    title:{
        type:String
    },

    episodesCount:{
        type:Number,
        default:0
    },

    country:{
        type:String,
        default:"USA"
    },
    quality:{
        type:String,
        default:"HD"
    },
    video:{
        type:String,
        enum:["TV","MOVIE"]
    },
    seasonsAndEpisodes:{
        type:[mongoose.Types.ObjectId],
        ref:"seasons"
    }
},{timestamps:true})

export const tv= mongoose.model("tv",tvSchema)