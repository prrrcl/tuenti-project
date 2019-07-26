'use strict';
const mongoose = require('mongoose');
const User = require('../models/User');
const Album = require('../models/Album');

mongoose.connect('mongodb://localhost/tuentiBd', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

async function editImg () {
  await User.findByIdAndUpdate({ _id: '5d3ab9dbfe91b73fb3c0811d' }, { profileImg: '/images/default.jpg' });

  mongoose.connection.close();
}

editImg();
