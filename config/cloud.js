const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dsjopbxpn',
  api_key: '669649547168753',
  api_secret: '4rryt_3-InITIOXuAbWzGNDzBHo'
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'tuentiyo',
  allowedFormats: ['jpg', 'png']
});

const parser = multer({ storage: storage });

module.exports = parser;
