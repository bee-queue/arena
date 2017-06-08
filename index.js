const app = require('./src/server/app');

module.exports = function(config) {
  app.set('bull config', config);

  return app;
};
