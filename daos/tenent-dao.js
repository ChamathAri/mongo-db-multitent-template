var MongooseDao = require('./mongoose-dao');
var TenentMongooseSchema = require('../models/tenent-model');
var winston = require('winston');
var mongoose = require('mongoose');

module.exports = class TenentDao extends MongooseDao {

  constructor() {
    super(TenentMongooseSchema);
    this.model = mongoose.model('tenent', TenentMongooseSchema);
  }

  createTenent(tenentData) {
    return new Promise((resolve, rejetc) => {
      this.create(tenentData).then((result) => {
        resolve(result);
      }).catch((error) => {
        winston.error('TenentDao createTenent:' + error.stack);
        reject(error);
      });
    });
  }

}