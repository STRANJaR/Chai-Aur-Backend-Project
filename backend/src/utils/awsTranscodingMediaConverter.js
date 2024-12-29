// import AWS from 'aws-sdk'

import {MediaConvertClient, CreateJobCommand} from '@aws-sdk/client-mediaconvert'


const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;

// Initialize the MediaConvert client
const client = new MediaConvertClient({
    endpoint: 'https://390403901331.mediaconvert.eu-west-1.amazonaws.com',
    region: 'eu-west-1',  // Use a supported region
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });



  console.log('sdkClient: ', client);

// const mediaConvert = new AWS.MediaConvert({
//     credentials: {
//         accessKeyId: accessKey,
//         secretAccessKey: secretKey,
//     },
//     endpoint: 'https://390403901331.mediaconvert.ap-south-1.amazonaws.com',
//     region: 'ap-south-1',
// })

const createMediaConvertJob = async (inputFile, outputLocation) => {
    console.log('inputFile: ', inputFile)
    console.log('outputLocation: ', outputLocation)

    const params = {
        Role: 'arn:aws:iam::390403901331:role/service-role/MediaConvert_Default_Role', // Replace with your MediaConvert IAM role
        Settings: {
            OutputGroups: [
                {
                    Name: "Apple HLS",
                    OutputGroupSettings: {
                        Type: "HLS_GROUP_SETTINGS",
                        HlsGroupSettings: {
                            SegmentLength: 10, // Segment length in seconds
                            Destination: outputLocation, // S3 output destination
                            MinSegmentLength: 0,
                            ManifestDurationFormat: "INTEGER",
                            OutputSelection: "MANIFESTS_AND_SEGMENTS",
                            SegmentControl: "SEGMENTED_FILES",
                            MinFinalSegmentLength: 0
                        }
                    },
                    Outputs: [
                        {
                            VideoDescription: {
                                Width: 426,  // 240p width
                                Height: 240, // 240p height
                                CodecSettings: {
                                    Codec: "H_264",
                                    H264Settings: {
                                        MaxBitrate: 400000, // Set bitrate for 240p
                                        RateControlMode: "CBR"
                                    }
                                }
                            },
                            ContainerSettings: {
                                Container: "M3U8"
                            },
                            NameModifier: "_240p"
                        },
                        {
                            VideoDescription: {
                                Width: 640,  // 360p width
                                Height: 360, // 360p height
                                CodecSettings: {
                                    Codec: "H_264",
                                    H264Settings: {
                                        MaxBitrate: 800000, // Set bitrate for 360p
                                        RateControlMode: "CBR"
                                    }
                                }
                            },
                            ContainerSettings: {
                                Container: "M3U8"
                            },
                            NameModifier: "_360p"
                        },
                        {
                            VideoDescription: {
                                Width: 854,  // 480p width
                                Height: 480, // 480p height
                                CodecSettings: {
                                    Codec: "H_264",
                                    H264Settings: {
                                        MaxBitrate: 1200000, // Set bitrate for 480p
                                        RateControlMode: "CBR"
                                    }
                                }
                            },
                            ContainerSettings: {
                                Container: "M3U8"
                            },
                            NameModifier: "_480p"
                        }
                    ]
                }
            ],
            Inputs: [
                {
                    FileInput: inputFile,  // Input video file (S3 path)
                    AudioSelectors: {
                        "Audio Selector 1": {
                            DefaultSelection: "DEFAULT"
                        }
                    }
                }
            ]
        }
    };

    try {
        // const data = await mediaConvert.createJob(params).promise();

        const data = await client.send(new CreateJobCommand(params));
        console.log('MediaConvert Job Created', data);
    } catch (err) {
        console.error('Error creating MediaConvert job:', err);
    }
};

export { createMediaConvertJob }

// Call this function after the video is uploaded to S3
// createMediaConvertJob('s3://your-input-bucket/your-video-file.mp4', 's3://your-output-bucket/transcoded/');




























// import AWS from 'aws-sdk';

// const s3 = new AWS.S3();

// const mediaConvert = new AWS.MediaConvert({ apiVersion: '2017-08-29', endpoint: 'https://abcd.mediaconvert.region.amazonaws.com' }); // Replace with your endpoint


// const transcodignHandler = async (event) => {
//     try {
//         const inputBucket = event.Records[0].s3.bucket.name;
//         const inputKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

//         const inputFilePath = `s3://${inputBucket}/${inputKey}`;
//         const outputS3Path = `s3://youtube-yard-output/videos/`;

//         const params = {
//             Role: 'arn:aws:iam::YOUR_ACCOUNT_ID:role/MediaConvert_Default_Role',

//             settings: {
//                 OutputGroups: [
//                     {
//                         Name: "File Group",
//                         Outputs: [
//                             {
//                                 ContainerSettings: { Container: "MP4" },
//                                 VideoDescription: {
//                                     CodecSettings: {
//                                         Codec: "H_264",
//                                         H264Settings: { Bitrate: 500000 },
//                                     },
//                                     Height: 360,
//                                     Width: 640,
//                                 },
//                                 AudioDescription: [
//                                     {
//                                         CodecSettings: {
//                                             Codec: "AAC",
//                                             AacSettings: { Bitrate: 64000 },
//                                         }
//                                     }
//                                 ]
//                             }
//                         ],
//                         OutputGroupsSettings: {
//                             Type: "FILE_GROUP_SETTINGS",
//                             FileGroupSettings: { Destination: outputS3Path },
//                         }
//                     }
//                 ],
//                 Input: [
//                     {
//                         FileInput: inputFilePath,
//                         VideoSelector: { ColorSpace: "FOLLOW" },
//                     }
//                 ]
//             }
//         };

//         // Create MediaConvert job
//         const mediaConvertResponse = await mediaConvert.createJob(params).promise();
//         console.log("MediaConvert job created successfully: ", mediaConvertResponse);

//         return {
//             statusCode: 200,
//             body: JSON.stringify('MediaConvert job started'),
//         }
//     } catch (error) {
//         console.error("Error in Lambda handler", error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify('Failed to start MediaConvert Job'),
//         };
//     }
// }