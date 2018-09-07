var mongoose = require('mongoose');

module.exports = class MongooseDao {

  constructor(schemaModel) {
    this.model = schemaModel;
  }

  create(item) {
    return this.model.create(item);
  }

  findOneAndLean(query, projection, options) {
    return this.model.findOne(query, projection, options).lean().exec();
  }

}