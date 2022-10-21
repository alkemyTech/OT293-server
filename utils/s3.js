const fs = require('fs');

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadfile = async (file) => {
  const stream = fs.createReadStream(file.tempFilePath);
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${file.name}`,
    Body: stream,
  };
  const command = new PutObjectCommand(uploadParams);
  return await client.send(command);
};

const getSignUrl = async (filename) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
  });
  return await getSignedUrl(client, command, { expiresIn: 3600 });
};

module.exports = { uploadfile, getSignUrl };
