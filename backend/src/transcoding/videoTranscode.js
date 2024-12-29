import { exec } from 'child_process'
import path from 'path';
import fs from 'fs';
import { uploadOnAWS } from '../utils/awsUploader.js';


const transcodeVideo = async (filePath) => {

    const fileName = path.basename(filePath);


    const inputPath = `/app/public/temp/${fileName}`
    const output240p = `/app/transcoded/240p_${fileName}`;
    const output360p = `/app/transcoded/360p_${fileName}`;

    const transcode240p = `ffmpeg -y -i ${inputPath} -vf scale=426:240 ${output240p}`;
    const transcode360p = `ffmpeg -y -i ${inputPath} -vf scale=640:360 ${output360p}`;

    // Execute FFmpeg command inside the Docker container
    exec(`docker exec transcoder bash -c "${transcode240p}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error transcoding 240p: ${error.message}`);
            console.error(`FFmpeg stderr: ${stderr}`);  // Print the FFmpeg error output
            return;
        }
        console.log(`FFmpeg stdout: ${stdout}`);
        console.log('240p transcoding done');


        // Upload to S3
        console.log('uploading 240p: ', output240p)
        uploadOnAWS(output240p)
    });

    exec(`docker exec transcoder bash -c "${transcode360p}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error transcoding 360p: ${error.message}`);
            console.error(`FFmpeg stderr: ${stderr}`);  // Print the FFmpeg error output
            return;
        }
        console.log(`FFmpeg stdout: ${stdout}`);
        console.log('360p transcoding done');

        // Upload to S3
        console.log('uploading 360p: ', output360p)
        uploadOnAWS(output360p)

    });
}


export { transcodeVideo }
