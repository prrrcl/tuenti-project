'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const photoCommentSchema = new Schema({
  idPhoto: {
    type: ObjectId,
    ref: 'Photo'
  },
  idUser: {
    type: ObjectId,
    ref: 'User'
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const PhotoComment = mongoose.model('PhotoComment', photoCommentSchema);

module.exports = PhotoComment;
