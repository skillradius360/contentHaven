import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {video} from "../models/video.models.js";
import { main } from "../utils/googleUploader.js";
import uploader  from "../utils/cloudinary.js"

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
    const {pageNo} = req.query
    const allVideos = await video.aggregate([
       {
        $match:{}
       }
    ])

    // CUSTOM PAGINATION
    const filteredResults = await allVideos.slice(pageNo*10,10*pageNo+10)
    if(!filteredResults | !filteredResults>0) throw new apiError(400,"no data found")
    return res.status(200).json(new apiResponse(200,filteredResults,"all videos recieved!"))
})

const getSingleVideo = asyncHandler(async(req,res)=>{
    const {videoId} = req.params
    if(isValidObjectId(videoId)) throw new apiError(400,"The object id is not valid ")

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



export { uploadAVideo,
    getVideos,
    getSingleVideo,
    searchVideo
 };

