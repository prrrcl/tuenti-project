const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET home page. */

router.get('/', async (req, res, next) => {
  const { username } = req.query;
  try {
    const usersArray = await User.find({ username });
    // console.log(usersArray);
    res.locals.title = `Búsqueda de "${username}"`;
    res.render('search', { usersArray });
  } catch (err) {
    next(err);
  }
});

/*
router.get('/', async (req, res, next) => {
  const { username } = req.query;
  if ({ username }.includes('a')) {
    try {
      const usersArray = await User.find({ username });
      // console.log(usersArray);
      res.locals.title = `Búsqueda de "${username}"`;
      res.render('search', { usersArray });
    } catch (err) {
      next(err);
    }
  }
});
*/

module.exports = router;
