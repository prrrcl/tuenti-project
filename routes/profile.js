const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Album = require('../models/Album');
const Photo = require('../models/Photo');
const { isNotLoggedIn } = require('../middlewares/authMiddlewares');
const parser = require('../config/cloud');

/* GET home page. */
router.get('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const userLogged = req.session.currentUser._id;
    const userAlbums = await User.findById(userLogged).populate({
      path: 'albums',
      populate: {
        path: 'photos'
      }
    });
    console.log(userAlbums);
    res.render('user/profile', userAlbums);
  } catch (err) {
    next(err);
  }
});

router.get('/edit', isNotLoggedIn, (req, res, next) => {
  res.render('user/edit');
});

router.post('/editprofile', isNotLoggedIn, async (req, res, next) => {
  const { name, surnames } = req.body;
  const idUser = req.session.currentUser._id;
  await User.findByIdAndUpdate(idUser, { name, surnames });
  req.session.currentUser.name = name;
  req.session.currentUser.surnames = surnames;
  res.redirect(`/t/user/${req.session.currentUser.username}`);
});

router.post('/changepic', isNotLoggedIn, parser.single('profileImg'), async (req, res, next) => {
  const imageUrl = req.file.secure_url;
  const idUser = req.session.currentUser._id;
  await User.findByIdAndUpdate(idUser, { profileImg: imageUrl });
  req.session.currentUser.profileImg = imageUrl;
  res.redirect('/t/profile/edit');
});

router.get('/albums', isNotLoggedIn, (req, res, next) => {
  res.render('user/albums');
});

module.exports = router;
