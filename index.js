const express = require('express');
const path = require('path');
const Arena = require('./src/server/app');
const routes = require('./src/server/views/routes');

function run(config, listenOpts = {}) {
  const {app, Queues} = Arena(config);

  Queues.useCdn =
    typeof listenOpts.useCdn !== 'undefined' ? listenOpts.useCdn : true;

  app.locals.appBasePath = listenOpts.basePath || app.locals.appBasePath;

  if (listenOpts.disableListen) {
    app.use('/', express.static(path.join(__dirname, 'public')));
    app.use('/', routes);
  } else {
    app.use(
      app.locals.appBasePath,
      express.static(path.join(__dirname, 'public'))
    );
    app.use(app.locals.appBasePath, routes);

    const port = listenOpts.port || 4567;
    const host = listenOpts.host || '0.0.0.0'; // Default: listen to all network interfaces.
    app.listen(port, host, () => {
      console.log(`Arena is running on port ${port} at host ${host}`);
    });
  }

  return app;
}

module.exports = run;
