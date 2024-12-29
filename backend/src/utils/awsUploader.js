import AWS from 'aws-sdk';
import fs from "fs";
import path from 'path';


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_S3_REGION
});


const uploadOnAWS = async (localFilePath) => {

    // Check if the file exists before unlinking
    if (fs.existsSync(localFilePath)) {
        console.log(`File exists: ${localFilePath}`);
    
    }

    try {
        if (!fs.existsSync(localFilePath)) {
            throw new Error(`File not found: ${localFilePath}`);
        }

        const fileContent = fs.readFileSync(localFilePath);
        if(!fileContent || fileContent.length === 0)  
            throw new Error(`File is empty or not ready properly : ${localFilePath}`);
        console.log('File size: ', fileContent.length)


        const fileName = path.basename(localFilePath);
        console.log('fileName: ', fileName)

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `video/${fileName}`,
            Body: fileContent,
        };

        const video = await s3.upload(params).promise()

        fs.unlinkSync(localFilePath)
        return video


    } catch (error) {
        // fs.unlinkSync(localFilePath)
        console.log('Error is aws uploader: ', error)
    }

}


export { uploadOnAWS }