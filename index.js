var express = require('express');
var config = require('config');
var mongoose = require('mongoose');
var winston = require('winston');
var ExpressConfig = require('./bin/express-config');

var serverPort = config.get('server.port');
var app = express();
new ExpressConfig(app);

app.listen(serverPort, () => {
  winston.info('Express server listening on port ' + serverPort);
});




// var connectToMongoWithRetry = function () {
//   mongoose.connect(config.get('database.url'), {
//       auto_reconnect: true,
//       reconnectTries: Number.MAX_VALUE,
//       numberOfRetries: Number.MAX_VALUE
//     })
//     .then(() => {
//       var db = mongoose.connection;
//       winston.info("Connected to the database ");
//       db.on('open', () => {
//         winston.info("Connected to the database");
//       });
//       db.on("error", (err) => {
//         winston.error("Database error: " + err);
//       })
//       db.on("disconnected", () => {
//         winston.warn("disconnected from mongo")
//       })
//       db.on("reconnected", () => {
//         winston.info("reconnected to mongo")
//       })
//     })
//     .catch((err) => {
//       if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
//         winston.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
//         setTimeout(connectToMongoWithRetry, 5000);
//       } else {
//         winston.error('Failed to connect to mongo on startup', err);
//       }
//     });
//   return;
// };
// connectToMongoWithRetry();