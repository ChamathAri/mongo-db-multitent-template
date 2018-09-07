var express = require('express');
var Config = require('config');
var router = express.Router();


module.exports = class UserRouter {
  constructor(app) {
    this.initializeRouters();
    app.use(Config.get('user.route.base'), router);
  }

  initializeRouters() {
    router.route(Config.get('user.route.registerUser'))
      .post((req, res) => {
        // this.tenentService.createTenent(req, res);
      });
  }
}