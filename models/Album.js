'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const albumSchema = new Schema({
  idUser: {
    type: ObjectId,
    ref: 'User'
  },
  name: {
    type: String
  },
  photos: [{
    type: ObjectId,
    ref: 'Photo'
  }]
}, {
  timestamps: true
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
