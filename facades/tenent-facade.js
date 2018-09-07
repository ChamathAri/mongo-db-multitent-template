var winston = require('winston');
var express = require('express');

module.exports = class TenentFacade {

  constructor(tenentService, userService, organizationService) {
    this.tenentService = tenentService;
    this.userService = userService;
    this.organizationService = organizationService;
  }

  registerTenent(req, res) {
    
  }

}