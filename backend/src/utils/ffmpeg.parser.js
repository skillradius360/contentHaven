import fs from "fs";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";


const ffmpegParser = async function (filepath) {
    if (!filepath) throw new Error("Filepath not received to parse video and upload");

    const Uid = uuidv4();
    const outputPath = `../../public/uploads/${Uid}`;
    const hlsPath = `${outputPath}/index.m3u8`;

    // Ensure the output directory exists
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }

    const ffmpegCommand = `ffmpeg -i "${filepath}" -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 "${hlsPath}"`;

    try {
        exec(ffmpegCommand, (error, stdout, stderr) => {
            if (error) {
                console.log(`exec error: ${error}`)
            }
            console.log(`stdout: ${stdout}`)
            console.log(`stderr: ${stderr}`)
        })

        
        console.log("FFmpeg processing completed successfully!");
    } catch (error) {
        console.error("Some error occurred with the FFmpeg command:", error);
        throw new Error(error);
    }
};

// Example usage
ffmpegParser("../../public/temp/sample.mp4")
    .then(() => console.log("Processing Done"))
    .catch((err) => console.error("Error:", err));

export { ffmpegParser };
