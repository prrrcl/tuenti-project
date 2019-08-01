const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'tuentiyo',
  allowedFormats: ['jpg', 'png']
});

const parser = multer({ storage: storage });

module.exports = { parser, cloudinary };
