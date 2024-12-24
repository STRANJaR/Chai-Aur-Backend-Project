import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'



const s3 = new aws.S3(
    {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_S3_REGION
    }
)

const upload = multer(
    {
        storage: multerS3({
            s3: s3,
            bucket: process.env.AWS_BUCKET_NAME,
            metadata: (req, file, cb)=> {
                cb(null, {fieldName: file.fieldname});
            },
            
            key: (req, file, cb) => {
                cb(null, `videos/${Date.now()}_${file.originalname}`);
            },
        }),
    }
)


export default upload 