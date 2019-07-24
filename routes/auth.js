const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn, isFormFilled, isIdvalid } = require('../middlewares/authMiddlewares');

/* GET home page. */
router.get('/', isLoggedIn, (req, res, next) => {
  res.render('auth/login');
});

module.exports = router;
