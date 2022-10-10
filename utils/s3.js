const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");

const config = require("../config/config").development;

const client = new S3Client({
  region: config.awsBucketRegion,
  credentials: {
    accessKeyId: config.awsAccessKey,
    secretAccessKey: config.awsSecretAccessKey,
  },
});

const uploadfile = async (file) => {
  const stream = fs.createReadStream(file.tempFilePath);
  const uploadParams = {
    Bucket: config.awsBucketName,
    Key: `${file.name}`,
    Body: stream,
  };
  const command = new PutObjectCommand(uploadParams);
  return await client.send(command);
};

module.exports = client;
