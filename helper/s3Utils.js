import dotenv from "dotenv";

import s3 from "../client/s3.config.js";

dotenv.config();

export const uploadAsyncToS3 = (key, body, file) => {
  const { s3Client, uploadParams: params } = s3;

  const s3Params = {
    ...params,
    Key: key,
    Body: body,
    ContentType: file.mimetype,
    ContentDisposition: `attachment; filename=${file.originalname}`,
  };

  return s3Client.upload(s3Params).promise();
};
