const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    const friend = await User.findOne({ username });
    res.render('friend/profile', friend);
  } catch (error) {
    next(error);
  };
});

module.exports = router;
