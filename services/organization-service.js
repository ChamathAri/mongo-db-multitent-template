var express = require('express');
var config = require('config');
var winston = require('winston');

module.exports = class OrganizationService {
  constructor(organizationDao) {
    this.organizationDao = organizationDao;
  }

  createOrganization(req, res) {
    var organizationData = req.body;
    return this.organizationDao.createOrganization(organizationData).then((response) => {
      var infoCode = 'Organization creation successful';
      return {
        result: {
          data: response,
          message: infoCode
        },
        status: 'success',
      }
    }).catch((error) => {
      const errorCode = `An error occurred, user cannot be created, ${error}`;
      winston.error(errorCode);
      return {
        result: errorCode,
        status: 'fail'
      }
    });
  }

}