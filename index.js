const express = require('express');
const fs = require('fs');
const path = require('path');
const Arena = require('./src/server/app');
const routes = require('./src/server/views/routes');

function run(config, listenOpts = {}) {
  const {app, Queues} = Arena();

  if (config) Queues.setConfig(config);
  Queues.useCdn = typeof listenOpts.useCdn !== 'undefined' ? listenOpts.useCdn : true;

  app.locals.appBasePath = listenOpts.basePath || app.locals.appBasePath;

  app.use(app.locals.appBasePath, express.static(path.join(__dirname, 'public')));
  app.use(app.locals.appBasePath, routes);

  const port = listenOpts.port || 4567;
  const host= listenOpts.host || '0.0.0.0'; // Default: listen to all network interfaces.
  if (!listenOpts.disableListen) {
    app.listen(port, host, () => console.log(`Arena is running on port ${port} at host ${host}`));
  }

  return app;
}

if (require.main === module) run();

module.exports = run;
