const { PutObjectCommand, ListObjectsCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const fs = require("fs");

const config = require("../config/config").development;
const client = require('../utils/s3');

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
    const url = await getFileURL(file.name);
    return url
}

const getFileURL = async(filename) => {
    const command = new GetObjectCommand({
        Bucket: config.awsBucketName,
        Key: filename
    });
    return await getSignedUrl(client, command, {expiresIn: 3600})
}

module.exports = uploadImage;