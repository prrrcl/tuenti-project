const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Status = require('../models/Status');
const { isLoggedIn, isNotLoggedIn, isFormFilled, isIdvalid } = require('../middlewares/authMiddlewares');

/* GET home page. */
router.get('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findById(req.session.currentUser._id).populate('status');
    const lastIndexOfStatus = user.status.length;
    const lastStatus = user.status[lastIndexOfStatus - 1];
    res.locals.title = `Inicio`;
    res.render('user/dashboard', lastStatus);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
