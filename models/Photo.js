'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const photoSchema = new Schema({
  idAlbum: {
    type: ObjectId,
    ref: 'Album'
  },
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  comments: [{
    type: ObjectId,
    ref: 'Album'
  }]

}, {
  timestamps: true
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
