import ffmpeg from 'fluent-ffmpeg'
import AWS from 'aws-sdk';
import fs from 'fs';


const bucketName = process.env.AWS_BUCKET_NAME;


// Initialize AWS S3
const s3 = new AWS.S3();

// Function to transcode video to multiple resolutions
const transcodeVideo = (inputFile) => {
    return new Promise((resolve, reject) => {
        ffmpeg(inputFile)
            .output('240p.m3u8')
            .videoCodec('libx264')
            .size('426x240')
            .outputOptions('-hls_time 10')
            .on('end', () => resolve('240p finished'))
            .run();
        // Continue for other resolutions like 360p, 480p etc.
    });
};

// Function to upload transcoded video to S3
const uploadToS3 = (filePath, bucketName, key) => {
    const fileStream = fs.createReadStream(filePath);
    const params = { Bucket: bucketName, Key: key, Body: fileStream };
    return s3.upload(params).promise();
};

// Main process: receive input file, transcode, and upload
const main = async (inputVideoFile) => {
    const inputFile = '/app/input.mp4'; // This should be passed or mounted
    const transcodedVideo = await transcodeVideo(inputFile);
    console.log('transcodedVideo: ', transcodedVideo);

    // Upload each resolution to S3
    const vidoeUploadOnS3 = await uploadToS3('240p.m3u8', bucketName, 'arn:aws:s3:::youtube-yard-transcoded/transcoded/240p.m3u8');
    console.log('Video processed and uploaded to S3', vidoeUploadOnS3);
};

main('/public');
