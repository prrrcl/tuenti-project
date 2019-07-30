'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Album = require('../models/Album');

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

module.exports = router;
