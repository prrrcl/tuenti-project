const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Album = require('../models/Album');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { isLoggedIn, isNotLoggedIn, isFormFilled, isSignUpFormFilled } = require('../middlewares/authMiddlewares');

/* GET home page. */
router.get('/', isLoggedIn, (req, res, next) => {
  const data = {
    messages: req.flash('ErrorFormFilled')
  };
  res.locals.title = `Conectarse`;
  res.render('auth/login', data);
});

router.post('/', isLoggedIn, isFormFilled, async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    // si no encuentra el usuario:
    if (!user) {
      return res.redirect('/');
    }
    // Comprobamos que la pass introducida es la misma que la de la bd
    if (bcrypt.compareSync(password /* provided password */, user.password/* hashed password */)) {
      // Save the login in the session!
      req.session.currentUser = user;
      res.redirect('/t/home');
    } else {
      res.redirect('/');
    }
  } catch (err) {
    next(err);
  }
});

router.get('/signup', isLoggedIn, (req, res, next) => {
  const data = {
    messages: req.flash('ErrorFormFilled')
  };
  res.locals.title = `Registrarse`;
  res.render('auth/signup', data);
});

router.post('/signup', isLoggedIn, isSignUpFormFilled, async (req, res, next) => {
  const { name, surnames, username, password } = req.body; // recibimos los datos del form

  // validamos que no haya un usuario con el mismo nombre de usuario:
  const user = await User.findOne({ username });
  if (user) {
    return res.redirect('/signup');
  }
  // creamos el crypt para la pass
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const user = await User.create({
      name,
      surnames,
      username,
      password: hashedPassword
    });
    await Album.create({
      idUser: user._id,
      name: 'My album'
    });
    // añadimos este usuario nuevo a la session
    req.session.currentUser = user;
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

router.post('/logout', isNotLoggedIn, (req, res, next) => {
  delete req.session.currentUser;
  return res.redirect('/');
});

module.exports = router;
