const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Album = require('../models/Album');
const Photo = require('../models/Photo');

router.get('/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    const friend = await User.findOne({ username });
    res.render('friend/profile', friend);
  } catch (error) {
    next(error);
  };
});

router.get('/:username/albums', async (req, res, next) => {
  try {
    const username = req.params.username;
    const userAlbums = await User.findOne({ username });
    res.render('user/albums', userAlbums);
  } catch (error) {
    next(error);
  };
});

router.get('/:username/albums/:idAlbum', async (req, res, next) => {
  try {
    const album = await Album.findOne({ _id: req.params.id }).populate('photos');
    console.log(album);
    res.render('user/album', album);
  } catch (error) {
    next(error);
  };
});

router.get('/:username/albums/:idAlbum/:idPhoto', async (req, res, next) => {
  try {
    const photos = await Photo.findOne({ _id: req.params.id });
    console.log(photos);
    res.render('user/foto', photos);
  } catch (error) {
    next(error);
  };
});

module.exports = router;
