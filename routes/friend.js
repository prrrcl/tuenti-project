const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Album = require('../models/Album');
const Photo = require('../models/Photo');
const Status = require('../models/Status');
const PhotoComment = require('../models/PhotoComment');
const DomParser = require('dom-parser');
const parser = new DomParser();
const moment = require('moment');
const { cloudinary } = require('../config/cloud');
moment.locale('es');

router.get('/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    const friend = await User.findOne({ username }).populate({
      path: 'status albums friends',
      populate: {
        path: 'photos'
      }
    });
    const imgProfile = friend.profileImg;
    const image = cloudinary.image(imgProfile, { transformation: 'oneWithoutGrav', type: 'fetch' });
    const splittedImage = image.split(' ');
    const src = splittedImage[1];
    const url = src.split("'")[1];
    const last4Albums = friend.albums.map(e => e).splice(-4, 4);
    const last6Friends = friend.friends.map(e => e).splice(-6, 6);
    const lastIndexOfStatus = friend.status.length;
    let data = {};
    if (lastIndexOfStatus !== 0) {
      const lastStatus = friend.status[lastIndexOfStatus - 1];
      const dateStatus = moment(lastStatus.createdAt).startOf('minutes').fromNow();
      data = {
        friend,
        lastStatus,
        dateStatus,
        last4Albums,
        last6Friends,
        url
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
    const user = await User.findOne({ username: req.params.username }).populate('albums');
    const album = await Album.findOne({ _id: req.params.idAlbum }).populate('photos');
    const photosArray = album.photos;
    let currentPosition = null;
    photosArray.forEach((photo, index) => {
      if (photo.equals(req.params.idPhoto)) {
        currentPosition = index;
      }
    });
    const nextThreePhotos = photosArray.map(e => e).splice(currentPosition + 1, 3);
    console.log(nextThreePhotos);
    nextThreePhotos.forEach((thumb) => {
      const img = thumb.photo;
      const image = cloudinary.image(img, { transformation: 'oneWithoutGrav', type: 'fetch' });
      const splittedImage = image.split(' ');
      const src = splittedImage[1];
      const url = src.split("'")[1];
      thumb.nextPhotosCropped = url;
    });
    const photo = await Photo.findOne({ _id: req.params.idPhoto }).populate({
      path: 'comments',
      populate: {
        path: 'idUser'
      }
    });
    photo.comments.forEach((c) => {
      c.date = moment(c.createdAt).startOf('minutes').fromNow();
      const img = c.idUser.profileImg;
      const image = cloudinary.image(img, { transformation: 'oneWithoutGrav', type: 'fetch' });
      const splittedImage = image.split(' ');
      const src = splittedImage[1];
      const url = src.split("'")[1];
      c.photoCropped = url;
    });
    const data = {
      user,
      album,
      photo,
      nextThreePhotos
    };
    res.locals.title = `${photo.name}`;
    res.render('user/foto', data);
  } catch (error) {
    next(error);
  };
});

module.exports = router;
