var mongoose = require('mongoose');
var uuid = require('node-uuid');

var organizationSchema = new mongoose.Schema({
  organizationId: {
    type: String,
    unique: true,
    default: uuid.v1,
  },
  organizationName: {
    type: String,
  }
});

module.exports = organizationSchema;
