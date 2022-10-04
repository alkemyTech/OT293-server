require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    awsBucketName: process.env.AWS_BUCKET_NAME,
    awsBucketRegion: process.env.AWS_BUCKET_REGION,
    awsAccessKey: process.env.AWS_ACCESS_KEY,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    dialect: "mysql",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    awsBucketName: process.env.AWS_BUCKET_NAME,
    awsBucketRegion: process.env.AWS_BUCKET_REGION,
    awsAccessKey: process.env.AWS_ACCESS_KEY,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    awsBucketName: process.env.AWS_BUCKET_NAME,
    awsBucketRegion: process.env.AWS_BUCKET_REGION,
    awsAccessKey: process.env.AWS_ACCESS_KEY,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    dialect: "mysql",
  },
};
