import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {video} from "../models/video.models.js";
import { main } from "../utils/googleUploader.js";
import uploader  from "../utils/cloudinary.js"
import Redis from "ioredis"
import {tv} from "../models/tv.models.js"
import { isValidObjectId } from "mongoose";
import {seasons} from  "../models/seasons.models.js"

// Import the uploader

const uploadAVideo = asyncHandler(async (req, res) => {
    const { title, description, releaseDate, cast, trailerLink,timeframe,quality,type } = req.body;

    if ([title, description, releaseDate, cast, trailerLink].some((data) => data?.trim() === "")) {
        throw new apiError(400, "Video uploading credentials are not present");
    }

    const isThere = await video.findOne({
        $and: [{ title }, { description }],
    });

    if (isThere) throw new apiError(400, "Video already exists");
    
    console.log(req.files)
    const file = req.files.videoFile[0].path;

    if (!file) throw new apiError(400, "No video file received");
    console.log(req.files)
    const titleImg = req.files.titleImg[0]?.path
    const titleImageReadyURL = await uploader(titleImg)

    console.log(titleImageReadyURL)
    if (!titleImg) throw new apiError (400, "No title image received");

    const vidURL = await main(file)

    console.log(vidURL)
if(!vidURL) throw new apiError(400,"some error prevented uploading")

    
    const newVideo = await video.create({
        title,
        description,
        releaseDate,
        cast,
        trailerLink,
        videoURI: vidURL, 
        templateImg:titleImageReadyURL?.url,
        timeframe,quality,type
    });

    return res.status(200).json(new apiResponse(200, newVideo, "Video uploaded successfully!"));
});

const getVideos = asyncHandler(async(req,res)=>{ 
    const redis= new Redis()

    const {pageNo} = req.query
    const redisData = await redis.get("landingPage:posts")
    if(redisData && redisData.length>1){
        return res.status(200).json(new apiResponse(200,JSON.parse(redisData),"redis has data"))
    }
    const allVideos = await video.aggregate([
        {
            $match:{}
        }
    ])
    // SET REDIS CACHE 
    const cachedData = await redis.set("landingPage:posts",JSON.stringify(allVideos))
    await redis.expire("landingPage:posts",30) //Set expire
    console.log(cachedData)
    if(!cachedData || cachedData!=="OK") throw new apiError(400,"caching failure")
        
        const uploadedData = await redis.get("landingPage:posts")
        
        const filteredResults = await JSON.parse(uploadedData).slice(pageNo*10,10*pageNo+10)
        
        // CUSTOM PAGINATION
    if(!filteredResults | !filteredResults>0) throw new apiError(400,"no data found")

    return res.status(200).json(new apiResponse(200,filteredResults,"all videos recieved!"))
})

const getSingleVideo = asyncHandler(async(req,res)=>{
    const {videoId} = req.params
    if(!isValidObjectId(videoId)) throw new apiError(400,"The object id is not valid ")

    const videoData = await video.findById(videoId)
    if(!videoData) throw new apiError(400,"no video found by this ID")
    
    return res.status(200).json(new apiResponse(200,videoData,"fetched the video"))
})

const searchVideo = asyncHandler(async(req,res)=>{
    const {searchQuery} = req.query 
    const query = searchQuery.split("-")
    
    const result = await video.find(
        { $or: query.map(q => ({ title: { $regex: q, $options: "i" } })) }

    )

    if(!result && !(result.length>1)) {
        return res.status(200).json(new apiResponse(200,result,"no search result spotted"))}

        else return res.status(200).json(new apiResponse(200,result,"search results found!"))
})

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>****<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const uploadTV = asyncHandler(async(req,res)=>{
    const {title,episodesCount,country,quality,video}= req.body

    if([title,episodesCount,country,quality,video].some((e)=>e?.trim()==="")) throw new apiError(400,"not recieved data when uploading TV content")

    
    const TvDoc = await tv.create({
        title,
        episodesCount,
        country,
        quality,
        video ,
    

    })
    if(!TvDoc) throw new apiError(400,"web series document creation failed!")

    const finalDoc = await tv.findById(TvDoc?._id)
    if(!finalDoc) throw new apiError(400,"series creation failure")

res.status(200).json(new apiResponse(200,finalDoc,"web series format made"))
})


const uploadSeasons = asyncHandler(async(req,res)=>{
    const {seriesId} =req.params
    const {title,seasonNo}= req.body

    if(!seriesId && !isValidObjectId(seriesId)) throw new apiError(400,"No series id provided to connect to!")
    if(!title && seasonNo) throw new apiError(400,"No title and seasonNo provided")
    
    const seriesData = await tv.findById(seriesId)
    if(!seriesData) throw new apiError(404,"no series data found or it doesnt exist")

    const currentSeasonData = await seasons.findOne({
        $and:[{title:title},{_id:seriesId}]
    })
    console.log(currentSeasonData)

    if(currentSeasonData) throw new apiError(400,"current episode exists")

        console.log(req.files)
        const currentEpisode= req.files.videoFile[0].path;

    if(!currentEpisode) throw new apiError(404,"no file incoming found")
    const data = await main(currentEpisode)
if(!data) throw new apiError(400,"uploading of the episode failed!")
    
    const SeasonObj = await seasons.create({
        title,
        seasonNo,
        videoURI:data
    })
    if(!SeasonObj) throw new apiError(400, "Episode upload failed") 

    const isSeasonObjCreated = await seasons.findById(SeasonObj?._id)
    if(!isSeasonObjCreated) throw new apiError(400,"seasons creation failed!")

    return res.status(200).json(new apiResponse(200,isSeasonObjCreated,"Episode uploaded"))
})

export { uploadAVideo,
    getVideos,
    getSingleVideo,
    searchVideo,uploadTV,uploadSeasons
    };

