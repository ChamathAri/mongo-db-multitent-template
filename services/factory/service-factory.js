var TenentService = require('../tenent-service');
module.exports = class ServiceFactory {
  constructor(daoFactory, db) {
    this.service = null;
    this.db = db;
    this.tenentDao = daoFactory.getDao('TenentDao');
  }

  getService(s) {
    switch (s) {
      case 'TenentService':
        this.service = new TenentService(this.tenentDao, this.db);
        break;

      default:
        return this.service;

    }
    return this.service;
  }
}