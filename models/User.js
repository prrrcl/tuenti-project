'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surnames: {
    type: String,
    required: true
  },
  profileImg: {
    type: String,
    default: '/images/default.jpg'
  },
  albums: [{
    type: ObjectId,
    ref: 'Album'
  }],
  status: [{
    type: ObjectId,
    ref: 'Status'
  }],
  friends: [{
    type: ObjectId,
    ref: 'User'
  }],
  description: {
    type: String
  },
  job: {
    type: String
  },
  studies: {
    type: String
  },
  isFriend: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
