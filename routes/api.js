'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Album = require('../models/Album');
const Photo = require('../models/Photo');
const PhotoComment = require('../models/PhotoComment');

router.post('/addAlbum', async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const { name } = req.body;
    const album = await Album.create({ name, userId });
    const albumID = album._id;
    await User.findByIdAndUpdate(userId, { $push: { albums: albumID } });
    res.json(album);
  } catch (err) {
    next(err);
  }
});

router.post('/postComment', async (req, res, next) => {
  try {
    const idUser = req.session.currentUser._id;
    const comment = req.body.comment;
    const idPhoto = req.body.idPhoto;
    const createdComment = await PhotoComment.create({ idUser, idPhoto, comment });
    const user = await User.find({ _id: idUser }).populate({
      path: 'albums',
      populate: {
        path: 'photos'
      }
    });
    const data = {
      user,
      createdComment
    };
    await Photo.findByIdAndUpdate(idPhoto, { $push: { comments: createdComment._id } });
    console.log(data);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
