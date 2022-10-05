const { PutObjectCommand, ListObjectsCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('fs');

const config = require("../config/config").development;
const client = require('../utils/s3');

const uploaImage = async (imageFile) => {
    const stream = fs.createReadStream(imageFile);
    const uploadParams = {
        Bucket: config.awsBucketName,
        Key: `${file.name}`,
        Body: stream
    }
    const command =new PutObjectCommand(uploadParams);
    const result = await client.send(command);
    console.log(result);
    
}

module.exports = uploaImage;