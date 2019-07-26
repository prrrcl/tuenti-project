'use strict';
const mongoose = require('mongoose');
const Album = require('../models/Album');

mongoose.connect('mongodb://localhost/tuentiBd', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const data = [{
  idUser: '5d3b2458e8462a1e7580ad6c',
  name: 'Sonar',
  photos: ['5d3ac63b4d95bd42e7ae4619', '5d3ac6a6902ea242edf3bd72']
}];

async function addAlbum (data) {
  for (let i = 0; i < data.length; i++) {
    data[i] = await Album.create({ idUser: data[i].idUser, name: data[i].name, photos: data[i].photos });
    console.log(data[i] + ' introduced');
  }

  mongoose.connection.close();
}

addAlbum(data);
