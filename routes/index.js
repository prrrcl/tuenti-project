const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn, isFormFilled, isIdvalid } = require('../middlewares/authMiddlewares');

/* GET home page. */
<<<<<<< HEAD
router.get('/home', isNotLoggedIn, (req, res, next) => {
  res.render('user/dashboard');
=======
router.get('/', isLoggedIn, (req, res, next) => {
  res.render('auth/login');
>>>>>>> ab710ff652367635ed7a091d0ee448297f235896
});

module.exports = router;
