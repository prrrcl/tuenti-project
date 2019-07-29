'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const commentPhotoSchema = new Schema({
  idPhoto: {
    type: ObjectId,
    ref: 'Photo'
  },
  idUser: {
    type: ObjectId,
    ref: 'User'
  },
  Comment: {
    type: String
  }
});

const CommentPhoto = mongoose.model('CommentPhoto', commentPhotoSchema);
module.exports = CommentPhoto;
