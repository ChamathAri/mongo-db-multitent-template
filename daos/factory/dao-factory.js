var TenentDao = require('../tenent-dao');
var UserDao = require('../user-dao');
var OrganizationDao = require('../organization-dao');

module.exports = class Daofactory {

  constructor() {
    this.baseDao = null;
  }

  getDao(d) {
    switch (d) {
      case 'TenentDao':
        this.baseDao = new TenentDao();
        break;

      case 'UserDao':
        this.baseDao = new UserDao();
        break;

      case 'OrganizationDao':
        this.baseDao = new OrganizationDao();
        break;

      default:
        return this.baseDao;
    }
    return this.baseDao;
  }

}