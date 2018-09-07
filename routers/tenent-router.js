var express = require('express');
var Config = require('config');
var router = express.Router();

var DaoFactory = require('../daos/factory/dao-factory');
var ServiceFactory = require('../services/factory/service-factory');


module.exports = class TenentRouter {
  constructor(app, db) {
    this.initializeRouters();
    var serviceFactory = new ServiceFactory(new DaoFactory(), db);
    this.tenentService = serviceFactory.getService('TenentService');
    app.use(Config.get('tenent.route.base'), router);
  }

  initializeRouters() {
    router.route(Config.get('tenent.route.t'))
      .post((req, res) => {
        this.tenentService.createTenent(req, res);
      });
  }
}