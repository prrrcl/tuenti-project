'use strict';
const mongoose = require('mongoose');
const CommentPhotos = require('../models/CommentPhotos');

mongoose.connect('mongodb://localhost/tuentiBd', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const data = [{
  idPhoto: '5d3eb429751f2c195f6877fe',
  idUser: '5d3b2458e8462a1e7580ad6c',
  Comment: 'QUE PASA ILLOOOOOOOOO'
}];

async function addComment (data) {
  for (let i = 0; i < data.length; i++) {
    data[i] = await CommentPhotos.create({ idPhoto: data[i].idPhoto, idUser: data[i].idUser, Comment: data[i].Comment });
  }

  mongoose.connection.close();
}

addComment(data);
