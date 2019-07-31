const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET home page. */

router.get('/', async (req, res, next) => {
  const { username } = req.query;
  try {
    const userLogged = await User.findOne({ _id: req.session.currentUser._id });
    User.find().then((usersArray) => {
      const filteredUsers = usersArray.filter((user) => {
        if (user.username === req.session.currentUser.username) {
          return null;
        }
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
      filteredUsers.forEach((usuario) => {
        if (userLogged.friends.includes(usuario._id)) {
          usuario.isFriend = true;
        }
      });
      console.log(filteredUsers);
      res.locals.title = `Búsqueda de "${username}"`;
      res.render('search', { filteredUsers });
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
