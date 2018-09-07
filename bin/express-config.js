// var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var compress = require('compression');
var methodOverride = require('method-override');
var glob = require('glob');
var rootPath = path.normalize(__dirname + '/..');
var winston = require('winston');
var DbConnection = require('../connections/database-connection');
var db = new DbConnection();

module.exports = class ExpressConfig {
  constructor(app) {
    this.app = app;
    this.createExpress();
  }

  createExpress() {
    var env = 'development';
    this.app.locals.ENV = env;
    this.app.locals.ENV_DEVELOPMENT = env === 'development';

    this.app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE, PATCH');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
        next();
      })
      .options('*', function (req, res, next) {
        res.end();
      });

    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
      extended: true,
    }));
    this.app.use(cookieParser());
    this.app.use(compress());
    this.app.use(methodOverride());

    this.app.use((req, res, next) => {
      db.initialize(req, res, next).then((resp) => {
        console.log('database got initialized for the request');
        next();
      });
    });

    const pathRoot = rootPath + '/routers/*.js';
    const routerFiles = glob.sync(pathRoot);

    routerFiles.forEach((controller) => {
      console.log(controller);
      var Route = require(controller);
      var RouteClass = Route;
      new RouteClass(this.app, this.db);
    });

    this.app.use((req, res, next) => {
      const err = new Error('Not Found');
      err['status'] = 404;
      next(err);
    });

    if (this.app.get('env') === 'development') {
      this.app.use((err, req, res) => {
        res.status(err['status'] || 500)
          .send({
            message: err.message,
            error: err,
            title: 'error',
          });
      });
    }

    // production error handler
    // no stack traces leaked to user
    this.app.use((err, req, res) => {
      res.status(err['status'] || 500)
        .send({
          message: err.message,
          error: {},
          title: 'error',
        });
    });

  }
}