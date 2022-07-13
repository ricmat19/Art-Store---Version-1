const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

//insures that the .env file is only run in a development environment and not a production environment
if (process.env.NODE_ENV !== "production") {
  //requires the the .env file configuration be run first hiding all info hidden via the .env file
  require("dotenv").config();
}

const region = process.env.S3REGION;
const bucketName = process.env.S3NAME;
const accessKeyId = process.env.S3KEY;
const secretAccessKey = process.env.S3SECRETKEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

module.exports = {
  uploadFile: function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename,
    };

    return s3.upload(uploadParams).promise();
  },
  getFileStream: function getFileStream(fileKey) {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName,
    };

    return s3.getObject(downloadParams).createReadStream();
  },
};
