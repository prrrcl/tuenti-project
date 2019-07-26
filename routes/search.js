const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET home page. */

router.get('/', async (req, res, next) => {
  const { username } = req.query;
  try {
    const usersArray = await User.find({ username });
    console.log(usersArray);
    res.render('search', { usersArray });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
