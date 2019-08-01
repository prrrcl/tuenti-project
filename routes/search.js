const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Status = require('../models/Status');
const { cloudinary } = require('../config/cloud');

/* GET home page. */

router.get('/', async (req, res, next) => {
  const { username } = req.query;
  try {
    const userLogged = await User.findOne({ _id: req.session.currentUser._id });
    User.find().populate('status').then((usersArray) => {
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
        const lastState = usuario.status[usuario.status.length - 1].status;

        usuario.lastState = lastState;

        if (userLogged.friends.includes(usuario._id)) {
          usuario.isFriend = true;
        }
        const photo = usuario.profileImg;
        const image = cloudinary.image(photo, { transformation: 'oneWithoutGrav', type: 'fetch' });
        const splittedImage = image.split(' ');
        const src = splittedImage[1];
        const url = src.split("'")[1];
        usuario.headPhoto = url;
      });

      res.locals.title = `Búsqueda de "${username}"`;
      res.render('search', { filteredUsers });
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
