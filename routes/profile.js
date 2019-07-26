const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res, next) => {
  try {
    const { username } = req.session.currentUser;
    const user = await User.findOne({ username });
    res.render('friend/profile', user);
  } catch (error) {
    next(error);
  };
});

module.exports = router;
