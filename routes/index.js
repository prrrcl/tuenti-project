const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn, isFormFilled, isIdvalid } = require('../middlewares/authMiddlewares');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect('/t/home');
});
router.get('/home', isNotLoggedIn, (req, res, next) => {
  res.render('user/dashboard');
});

module.exports = router;
