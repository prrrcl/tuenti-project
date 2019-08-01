const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Status = require('../models/Status');
const { cloudinary } = require('../config/cloud');
const { isLoggedIn, isNotLoggedIn, isFormFilled, isIdvalid } = require('../middlewares/authMiddlewares');

/* GET home page. */
router.get('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findById(req.session.currentUser._id).populate('status');
    const profileImg = user.profileImg;
    const image = cloudinary.image(profileImg, { transformation: 'oneWithoutGrav', type: 'fetch' });
    const splittedImage = image.split(' ');
    const src = splittedImage[1];
    const url = src.split("'")[1];
    const lastIndexOfStatus = user.status.length;
    const lastStatus = user.status[lastIndexOfStatus - 1];
    const data = {
      url,
      lastStatus
    };
    res.locals.title = `Inicio`;
    res.render('user/dashboard', data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
