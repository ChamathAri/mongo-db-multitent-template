var config = require('config');
var mongoose = require('mongoose');
var winston = require('winston');
global.MongooseConnection = [];
global.ServiceRegestry = [];

module.exports = class DatabaseConnection {

  constructor() {

  }

  initialize(req, res, next) {
    return new Promise((resolve, reject) => {
      var ClientConnection;
      if (global.MongooseConnection[req.body.domain]) {
        console.log('Open mongo connection for pool:', req.body.domain);
        ClientConnection = global.MongooseConnection[req.body.domain];
        global.ActiveClientMongooseConnection = ClientConnection;
      } else {
        // console.log('create new mongo connection for:', req.body.domain);
        var dbConncetion = (req.body.shiftToDefaultDb) ? config.database.url : config.database.urlbase + req.body.domain + config.database.db_sufix;
        ClientConnection = mongoose.createConnection(dbConncetion, {
          useNewUrlParser: true
        });
        global.MongooseConnection[req.body.domain] = ClientConnection;

        //Initialize Modules for connection
        var models = require('../models');
        (req.body.shiftToDefaultDb) ? models.initializeDefault(ClientConnection): models.initialize(ClientConnection);
        global.ActiveClientMongooseConnection = ClientConnection;
      }

      ClientConnection.on('connected', function () {
        console.log('Mongoose default connection open to  ' + dbConncetion);
        resolve();
        next();
      });

      // When the connection is disconnected
      ClientConnection.on('disconnected', function () {
        console.log('Mongoose ' + dbConncetion + ' connection disconnected');
        resolve();
        next();
      });

      // When error
      ClientConnection.on('error', function (error) {
        console.log('Mongoose error>>' + dbConncetion + ':', error);
        // No user with this name exists, respond back with a 401
        delete req.user;
        res.status(401);
        res.json({
          'status': 401,
          'message': 'Invalid Credentials'
        });
        reject();
      });
    });
  }

  connectToDefaultDb() {
    var connectToMongoWithRetry = function () {
      mongoose.connect(config.get('database.url'), {
          auto_reconnect: true,
          reconnectTries: Number.MAX_VALUE,
          numberOfRetries: Number.MAX_VALUE
        })
        .then(() => {
          var db = mongoose.connection;
          winston.info("Connected to the database ");
          db.on('open', () => {
            winston.info("Connected to the database");
          });
          db.on("error", (err) => {
            winston.error("Database error: " + err);
          })
          db.on("disconnected", () => {
            winston.warn("disconnected from mongo")
          })
          db.on("reconnected", () => {
            winston.info("reconnected to mongo")
          })
        })
        .catch((err) => {
          if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
            winston.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connectToMongoWithRetry, 5000);
          } else {
            winston.error('Failed to connect to mongo on startup', err);
          }
        });
      return;
    };
    connectToMongoWithRetry();
  }

  closeCurrentConnection() {
    mongoose.connection.close();
  }

}