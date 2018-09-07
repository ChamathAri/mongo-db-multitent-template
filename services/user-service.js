var express = require('express');
var config = require('config');
var winston = require('winston');

module.exports = class UserService {

  constructor(userDao) {
    this.userDao = userDao;
  }

  createUser(req, res) {
    var userData = req.body;
    this.userDao.createUser(userData).then((response) => {
      var infoCode = 'User creation successful';
      return {
        result: {
          data: response,
          message: infoCode
        },
        status: 'success',
      };
    }).catch((error) => {
      const errorCode = `An error occurred, user cannot be created, ${error}`;
      winston.error(errorCode);
      return {
        result: errorCode,
        status: 'fail'
      };
    });
  }

}