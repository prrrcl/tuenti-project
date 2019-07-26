const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isLoggedIn, isNotLoggedIn, isFormFilled, isIdvalid } = require('../middlewares/authMiddlewares');

/* GET home page. */
router.get('/', isNotLoggedIn, async (req, res, next) => {
  const userLogged = req.session.currentUser._id;
  const userAlbums = await User.findById(userLogged).populate({
    path: 'albums',
    populate: {
      path: 'photos'
    }
  });
  console.log(userAlbums);
  res.render('user/profile', userAlbums);
});

module.exports = router;
