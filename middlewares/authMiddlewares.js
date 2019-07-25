'use strict';
const mongoose = require('mongoose');

const isIdvalid = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.redirect(`/`);
  }
  next();
};

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
<<<<<<< HEAD
    return res.redirect('/t/home');
=======
    return res.redirect('/');
>>>>>>> ab710ff652367635ed7a091d0ee448297f235896
  }
  next();
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};

const isFormFilled = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
<<<<<<< HEAD
    req.flash('ErrorFormFilled', 'Todos los campos son requeridos'); // mandamos al view el error
    if (username) {
      req.flash('dataForm', username);
    }
=======
>>>>>>> ab710ff652367635ed7a091d0ee448297f235896
    return res.redirect(req.path);
  }
  next();
};

module.exports = { isIdvalid, isLoggedIn, isNotLoggedIn, isFormFilled };
