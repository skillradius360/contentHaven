import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {video} from "../models/video.models.js";
import { main } from "../utils/googleUploader.js";

// Import the uploader

const uploadAVideo = asyncHandler(async (req, res) => {
    const { title, description, releaseDate, cast, trailerLink } = req.body;

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


    // Call the uploader function to upload the video to MEGA
    const vidURL = await main(file)
    console.log(vidURL)
if(!vidURL) throw new apiError(400,"some error prevented uploading")
    const newVideo = await video.create({
        title,
        description,
        releaseDate,
        cast,
        trailerLink,
        videoURI: vidURL, // Save the public MEGA link
    });

    return res.status(200).json(new apiResponse(200, newVideo, "Video uploaded successfully!"));
});

export { uploadAVideo };
