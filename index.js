const express = require('express');
const path = require('path');
const Arena = require('./src/server/app');
const routes = require('./src/server/views/routes');

function run(config, listenOpts = {}) {
  const {app, Queues} = Arena();

  if (config) Queues.setConfig(config);
  Queues.useCdn = typeof listenOpts.useCdn !== 'undefined' ? listenOpts.useCdn : true;

  app.locals.basePath = listenOpts.basePath || app.locals.basePath;

  app.use('/', express.static(path.join(__dirname, 'public')));
  app.use('/', routes);

  const port = listenOpts.port || 4567;
  if (!listenOpts.disableListen) {
    app.listen(port, () => console.log(`Arena is running on port ${port}`));
  }

  return app;
}

if (require.main === module) run();

module.exports = run;
