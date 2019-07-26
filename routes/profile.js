const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Album = require('../models/Album');
const Photo = require('../models/Photo');
const { isNotLoggedIn } = require('../middlewares/authMiddlewares');

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

router.get('/albums', isNotLoggedIn, (req, res, next) => {
  res.render('user/albums');
});

module.exports = router;
