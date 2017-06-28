const {app, server} = require('./src/server/app');

module.exports = function(config, disableListen) {
  app.set('bull config', config);

  if (disableListen) server.close();

  return app;
};
