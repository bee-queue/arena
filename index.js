const {app, server} = require('./src/server/app');

module.exports = function(config, options) {
  options = typeof options == 'boolean' ? { disableListen: options } : options;
  const { disableListen, baseURL } = options;

  app.set('bull config', config);
  app.set('baseURL', (baseURL || ''));

  if (disableListen) server.close();

  return app;
};
