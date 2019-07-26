const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn, isFormFilled, isIdvalid } = require('../middlewares/authMiddlewares');

/* GET home page. */
router.get('/', isNotLoggedIn, (req, res, next) => {
  res.render('user/dashboard');
});

module.exports = router;
