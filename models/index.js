var models = {
  User: './user',
}

var defaultModels = {
  Tenent: './tenent-model'
}

module.exports = {
  initialize: function (ctx) {
    Object.keys(models).forEach(function (key) {
      ctx.model(key, require('./' + models[key]));
    });
  },

  initializeDefault: function (ctx) {
    Object.keys(defaultModels).forEach(function (key) {
      ctx.model(key, require('./' + defaultModels[key]));
    });
  }
};