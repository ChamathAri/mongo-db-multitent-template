var winston = require('winston');
var mongoose = require('mongoose');
var MongooseDao = require('./mongoose-dao');
var OrganizarionMongooseSchema = require('../models/organization-model');

module.exports = class OrganizationDao extends MongooseDao {

  constructor() {
    super(mongoose.model('organization', OrganizarionMongooseSchema));
  }

  createOrganization(organizationData) {
    return new Promise((resolve, rejetc) => {
      this.create(organizationData).then((result) => {
        resolve(result);
      }).catch((error) => {
        winston.error('OrganizationDao createOrganization:' + error.stack);
        reject(error);
      });
    });
  }

}