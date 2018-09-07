var mongoose = require('mongoose');
var uuid = require('node-uuid');

var userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    default: uuid.v1,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  userType: {
    type: String,
  },
  organizationId: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = userSchema;