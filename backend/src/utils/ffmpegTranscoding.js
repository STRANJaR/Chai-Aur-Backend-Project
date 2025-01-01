import fs from 'fs'
import { exec } from 'child_process'
import path from 'path'
import { uploadOnAWS } from './awsUploader.js'



const ffmpegVideoTranscode = async (videoLocalPath) => {
    console.log('Inside ffmpeg transcode filepath: ', videoLocalPath)


    const fileName = path.basename(videoLocalPath, path.extname((videoLocalPath)));
    console.log('Start transcoding for: ', fileName)


    const outputPath = `./public/transcoded/${fileName.trim()}`
    const hlsPath = `${outputPath}/${fileName.trim()}.m3u8`
    console.log('hlsPath: ', hlsPath)

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true })
    }

    // ffmpeg CHECK: no queue because of POC. not to be used in production 
    // const ffmpegCommand = `ffmpeg -i ${videoLocalPath} -codec:v libx264
    // -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename
    // "${outputPath}/segment%03d.ts -start_number 0 ${hlsPath}"`;

    const ffmpegCommand = `ffmpeg -i "${videoLocalPath}" -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 "${hlsPath}"`;

    exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) console.log(`exec error: ${error}`)

        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)


    })
    const data = uploadOnAWS(outputPath, fileName.trim())
    console.log('data: ', data);

    // https://youtube-yard.s3.ap-south-1.amazonaws.com/drone/drone.m3u8
    const videoUrl = `http://youtube-yard.s3.ap-south-1.amazonaws.com/${fileName.trim()}/${fileName.trim()}.m3u8`;
    console.log('Transcoded Video URL: ', videoUrl)
    return videoUrl


}


export { ffmpegVideoTranscode }