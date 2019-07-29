const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Album = require('../models/Album');
const Photo = require('../models/Photo');
const Status = require('../models/Status');
const PhotoComment = require('../models/PhotoComment');
const moment = require('moment');
moment.locale('es');

router.get('/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    const friend = await User.findOne({ username }).populate({
      path: 'status albums',
      populate: {
        path: 'photos'
      }
    });
    const lastIndexOfStatus = friend.status.length;
    let data = {};
    if (lastIndexOfStatus !== 0) {
      const lastStatus = friend.status[lastIndexOfStatus - 1];
      const dateStatus = moment(lastStatus.createdAt).startOf('minutes').fromNow();
      data = {
        friend,
        lastStatus,
        dateStatus
      };
    } else {
      data = {
        friend
      };
    }
    res.locals.title = `${friend.name}`;
    res.render('friend/profile', data);
  } catch (error) {
    next(error);
  };
});

router.get('/:username/upload', async (req, res, next) => {
  const username = req.body.username;
  const user = await User.findOne({ username });
  res.render('user/upload', user);
});

router.get('/:username/albums', async (req, res, next) => {
  try {
    const username = req.params.username;
    const userAlbums = await User.findOne({ username });
    res.locals.title = `Albums de ${userAlbums.name}`;
    res.render('user/albums', userAlbums);
  } catch (error) {
    next(error);
  };
});

router.get('/:username/albums/:idAlbum', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const album = await Album.findOne({ _id: req.params.idAlbum }).populate('photos');
    const data = {
      user,
      album
    };
    res.locals.title = `${album.name}`;
    res.render('user/album', data);
  } catch (error) {
    next(error);
  };
});

router.get('/:username/albums/:idAlbum/photo/:idPhoto', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const album = await Album.findOne({ _id: req.params.idAlbum });
    const photo = await Photo.findOne({ _id: req.params.idPhoto }).populate('comments');
    console.log(photo.comments);
    const data = {
      user,
      album,
      photo
    };
    res.locals.title = `${photo.name}`;
    res.render('user/foto', data);
  } catch (error) {
    next(error);
  };
});

module.exports = router;
