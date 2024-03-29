const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const User = require('./models/User');
const Album = require('./models/Album');
require('dotenv').config();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const searchRouter = require('./routes/search');
const friendRouter = require('./routes/friend');
const profileRouter = require('./routes/profile');
const apiRouter = require('./routes/api');

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

// --

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: process.env.secret,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(flash());

app.use(async (req, res, next) => {
  app.locals.currentUser = req.session.currentUser;
  if (req.session.currentUser) {
    const userGlobal = await User.findById(req.session.currentUser._id).populate('albums');
    app.locals.userGlobal = userGlobal;
  }
  next();
});

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/t/home', indexRouter);
app.use('/t/search', searchRouter);
app.use('/t/user', friendRouter);
app.use('/t/profile', profileRouter);
app.use('/api', apiRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

module.exports = app;
