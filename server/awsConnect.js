require("dotenv").config();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3"); // Import v3 clients and commands
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

// Configure AWS SDK v3 S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Configure Multer with S3 Storage (updated for AWS SDK v3)
const upload = multer({
  storage: multerS3({
    s3: s3Client,  // Use the S3Client instance from AWS SDK v3
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `uploads/${Date.now()}-${file.originalname}`);
    },
    contentDisposition: 'inline', // Set the Content-Disposition header to inline
  }),
});

module.exports = upload;
