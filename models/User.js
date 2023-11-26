const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Please provide name'],
    minLength: [3, ''],
    maxLength: [20, ''],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minLength: [6, ''],
  },
});

module.exports = mongoose.model('User', userSchema);
