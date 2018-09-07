var express = require('express');
var config = require('config');
var winston = require('winston');

module.exports = class TenentService {

  constructor(tenentDao, db) {
    this.tenentDao = tenentDao;
    this.dbConnection = db;
  }

  createTenent(req, res) {
    var tenentData = {
      tenentName: req.body.organizationName
    };
    
    this.tenentDao.createTenent(tenentData).then((response) => {
      var tenetResp = response;
      this.dbConnection.closeCurrentConnection();
      req.body.shiftToDefaultDb = false;
      this.dbConnection.initialize(req, res);
      this.dbConnection.initialize();

      var infoCode = 'Tenent creation successful';
      res.status(200).send({
        result: {
          data: tenetResp,
          message: infoCode
        },
        status: 'success',
      });
    }).catch((error) => {
      const errorCode = `An error occurred, tenent cannot be created, ${error}`;
      winston.error(errorCode);
      res.status(400)
        .send({
          result: errorCode,
          status: 'fail'
        });
    });
  }
}