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

  function copyVendorAssets(filePath, targetFileName) {
    targetFileName = targetFileName || path.basename(filePath);
    fs.createReadStream(path.join('./node_modules', filePath)).pipe(fs.createWriteStream(path.join(__dirname, './public/vendor', targetFileName)));
  }

  copyVendorAssets("tablesort/dist/tablesort.min.js");
  copyVendorAssets("jsoneditor/dist/jsoneditor.min.js");
  copyVendorAssets("jsoneditor/dist/jsoneditor.min.css");
  copyVendorAssets("jsoneditor/dist/img/jsoneditor-icons.svg", "img/jsoneditor-icons.svg");
  copyVendorAssets("tablesort/tablesort.css");

  return app;
}

if (require.main === module) run();

module.exports = run;
