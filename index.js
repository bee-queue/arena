const {app, server} = require('./src/server/app');

module.exports = function(config, disableListen) {
  app.set('queue config', config);

  if (disableListen) server.close();

  return app;
};
