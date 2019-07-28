'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const statusSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  status: {
    type: String
  }
}, {
  timestamps: true
});

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
