var winston = require('winston');
var mongoose = require('mongoose');
var MongooseDao = require('./mongoose-dao');
var UserMongooseSchema = require('../models/user');

module.exports = class UserDao extends MongooseDao {

  constructor() {
    super(mongoose.model('user', UserMongooseSchema));
  }

  createUser(userData) {
    return new Promise((resolve, rejetc) => {
      this.create(userData).then((result) => {
        resolve(result);
      }).catch((error) => {
        winston.error('UserDao createUser:' + error.stack);
        reject(error);
      });
    });
  }

}