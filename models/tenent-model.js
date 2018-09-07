var mongoose = require('mongoose');
var uuid = require('node-uuid');

var tenentSchema = new mongoose.Schema({
  tenentId: {
    type: String,
    unique: true,
    default: uuid.v1,
  },
  tenentName: {
    type: String,
  }
});

module.exports = tenentSchema;
