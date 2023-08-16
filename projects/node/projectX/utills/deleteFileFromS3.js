const { DeleteObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESSKEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});
module.exports = async (fileLocation) => {
  const urlParts = fileLocation.split("/");
  const key = urlParts[3];
  const command = new DeleteObjectCommand({
    Bucket: 'cntitans',
    Key: key,
  });
  try {
    const response = await client.send(command);
  
  } catch (err) {
    console.log(err);
  }
};
