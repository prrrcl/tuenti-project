'use strict';
const mongoose = require('mongoose');
const User = require('../models/User');
const Album = require('../models/Album');

mongoose.connect('mongodb://localhost/tuentiBd', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

async function addAlbum () {
  await User.findByIdAndUpdate({ _id: '5d3ab9dbfe91b73fb3c0811d' }, { $push: { albums: '5d3ac6c56e8ab642f8415ca2' } });

  mongoose.connection.close();
}

addAlbum();
