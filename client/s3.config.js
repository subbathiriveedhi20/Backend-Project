import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();
const { AWS_ACCESS_KEY: accessKeyId, AWS_SECRET_ACCESS_KEY: secretAccessKey, S3_BUCKET: Bucket } = process.env;

const s3Client = new AWS.S3({
    region: 'us-east-1',
    accessKeyId,
    secretAccessKey
});

const uploadParams = {
  Bucket,
  Key: '', // pass key
  Body: null // pass file body
};

const s3 = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;
export default s3;
