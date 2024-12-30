import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_S3_REGION
});


const uploadOnAWS = async(localFilePath)=> {
    try {
        fileContent = fs.readFileSync(localFilePath);
        const fileName = path.basename(localFilePath);


        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `video/${fileName}`,
            Body: fileContent,
        }

        const data = await s3.upload(params).promise();
        console.log(`File uploaded successfully. ${data.Location}`);
        return data

    } catch (error) {
        console.error(`Error uploading file to S3: ${error.message}`);
        throw error;
    }
};

export { uploadOnAWS }
















// import fs from 'fs';
// import path from 'path';
// import AWS from 'aws-sdk';

// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_KEY,
//     region: process.env.AWS_S3_REGION
// })

// const directory =  `/public/transcoded`
// console.log(directory)

// const uploadDirectoryToS3 = async() => {

//     fs.readdir(directory, (err, files) => {
//         if (err) {
//             console.error("Error reading directory", err);
//             return;
//         }

//         files.forEach(file => {
//             const filePath = path.join(directory, file);
//             console.log('filePath: ', filePath)

//             const fileStream = fs.createReadStream(filePath);
//             console.log('fileStream', fileStream)

//             const uploadParams = {
//                 Bucket: process.env.AWS_BUCKET_NAME,
//                 Key: `videos/${file}`, 
//                 Body: fileStream,
//             };

//             s3.upload(uploadParams, (err, data) => {
//                 if (err) {
//                     console.error(`Error uploading ${file}`, err);
//                 } else {
//                     console.log(`Successfully uploaded ${data}`);
//                 }
//             });
//         });
//     });
// };


// export {uploadDirectoryToS3}