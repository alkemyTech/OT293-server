const { S3Client ,PutObjectCommand, ListObjectsCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const fs = require("fs");

const config = require("../config/config").development;
const client = require('../utils/s3');

// const client = new S3Client({
//     region: config.awsBucketRegion,
//     credentials: {
//         accessKeyId: config.awsAccessKey,
//         secretAccessKey: config.awsSecretAccessKey
//     }
// });

const uploadImage = async (file) => {
    console.log(file.tempFilePath)
    const stream = fs.createReadStream(file.tempFilePath);
    const uploadParams = {
        Bucket: config.awsBucketName,
        Key: file.name,
        Body: stream
    }
    const command = new PutObjectCommand(uploadParams);
    const result = await client.send(command);
    console.log(result);
    
}

module.exports = uploadImage;