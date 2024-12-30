import { exec } from 'child_process'
import path from 'path';
import fs from 'fs';
import { stderr } from 'process';
import { uploadOnAWS } from '../utils/awsUploader.js';




const transcodeVideo = async (filePath) => {

    console.log('Inside transcoding filepath: ', filePath)

    const fileName = path.basename(filePath, path.extname((filePath)));
    console.log('Start transcoding for: ', fileName)


    const inputPath = `/app/public/temp/${fileName}${path.extname(filePath)}`
    const outputDirectory = `/app/transcoded/240p_${fileName}`;
    const output240pM3U8 = `${outputDirectory}240p_${fileName}.m3u8`



    // create directory if it doesn't exist 
    if(!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory, {recursive: true});
    }


    const transcode240p = `ffmpeg -y -i ${inputPath} -vf scale=426:240  -start_number 0  -hls_time 10  -hls_list_size 0  -f hls ${output240pM3U8}`;

    const executeCommand = (command) => {
        return new Promise((resolve, reject)=> {
            exec(command, (error, stdout, stderr) => {
                if(error){
                    console.log(`StdError: ${stderr}`);
                    reject(`StdError: ${stderr}`);
                } else{
                    resolve(stdout);
                }
            });
        });
    };


    try {
        // Transcoding 240p
        console.log('Transcoding 24p...');
        await executeCommand(`docker exec transcoder bash -c "${transcode240p}"`);
        console.log('240p trancoding done.');

        // Upload the files to AWS S3 
        const uploaded240p = await uploadTranscodedFilesToS3(outputDirectory, `240p_${fileName}`);
        console.log('Uploaded 240p files: ', uploaded240p);

        // Delete the local server files (clean up)
        cleanupFiles(outputDirectory);

    } catch (error) {
        console.log('Error during transcoding/uploading process: ', error);
    }


    const uploadTranscodedFilesToS3 = async(outputDirectory, fileNamePrefix) => {
        const uploadedFiles = [];

        // upload the .m3u8 file
        const m3u8FilePath = `${outputDirectory}${fileNamePrefix}.m3u8`;

        if(fs.existsSync(m3u8FilePath)){
            const uploadedM3U8 = await uploadOnAWS(m3u8FilePath);
            uploadedFiles.push(uploadedM3U8);
        }

        // Upload all .ts segment files 
        const segmentFiles = fs.readdirSync(outputDirectory).filter(file => file.endsWith('.ts'));

        for(const segmentFile of segmentFiles){
            const segmentFilePath = path.join(outputDirectory, segmentFile);
            const uploadedSegment = await uploadOnAWS(segmentFilePath);
            uploadedFiles.push(uploadedSegment);

        }
        return uploadedFiles;
    }

    // Funcition to cleanup local files after uploading to s3 
    const cleanupFiles = (directory) => {
        if (fs.existsSync(directory)) {
            fs.readdirSync(directory).forEach((file) => {
                const filePath = path.join(directory, file);
                fs.unlinkSync(filePath);  // Delete file
            });
            fs.rmdirSync(directory);  // Remove directory after cleaning files
        }
    };
}


export { transcodeVideo }








    
    // // Execute FFmpeg command inside the Docker container
    // exec(`docker exec transcoder bash -c "${transcode240p}"`, (error, stdout, stderr) => {
    //     if (error) {
    //         console.error(`Error transcoding 240p: ${error.message}`);
    //         console.error(`FFmpeg stderr: ${stderr}`);  // Print the FFmpeg error output
    //         return;
    //     }
    //     console.log(`FFmpeg stdout: ${stdout}`);
    //     console.log('240p transcoding done');


    //     console.log('output 240p: ', output240p)

    // });