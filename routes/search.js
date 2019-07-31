const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET home page. */

router.get('/', async (req, res, next) => {
  const { username } = req.query;
  try {
    User.find().then((usersArray) => {
      const filteredUsers = usersArray.filter((user) => {
        if (user.name.toLowerCase().includes(username.toLowerCase())) {
          return user;
        }
        if (user.surnames.toLowerCase().includes(username.toLowerCase())) {
          return user;
        }
        if (user.username.toLowerCase().includes(username.toLowerCase())) {
          return user;
        }
      });
      res.locals.title = `Búsqueda de "${username}"`;
      res.render('search', { filteredUsers });
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
