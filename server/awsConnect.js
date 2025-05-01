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
    contentType: function (req, file, cb) {
      cb(null, 'application/pdf');  // Force the Content-Type to 'application/pdf'
    },
  }),
});

const uploadImage = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    key: (req, file, cb) => {
      cb(null, `images/${Date.now()}-${file.originalname}`);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    contentDisposition: "inline",
  }),
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid image type. Only JPEG, PNG, and WEBP are allowed."));
    }
  },
});

module.exports = {upload, s3Client, uploadImage};
