const express = require('express');
const fs = require('fs');
const path = require('path');
const Arena = require('./src/server/app');
const routes = require('./src/server/views/routes');

function run(config, listenOpts = {}) {
  const {app, Queues} = Arena();

  if (config) Queues.setConfig(config);

  app.locals.basePath = listenOpts.basePath || app.locals.basePath;

  app.use(app.locals.basePath, express.static(path.join(__dirname, 'public')));
  app.use(app.locals.basePath, routes);

  const port = listenOpts.port || 4567;
  if (!listenOpts.disableListen) {
    app.listen(port, () => console.log(`Arena is running on port ${port}`));
  }

  return app;
}

if (require.main === module) run();

function copyVendorAssets(filePath, targetFileName) {
  targetFileName = targetFileName || path.basename(filePath);
  fs.createReadStream(path.join('./node_modules', filePath)).pipe(fs.createWriteStream(path.join('./public/vendor', targetFileName)));
}

copyVendorAssets("tablesort/dist/tablesort.min.js");
copyVendorAssets("jsoneditor/dist/jsoneditor.min.js");
copyVendorAssets("jsoneditor/dist/jsoneditor.min.css");
copyVendorAssets("jsoneditor/dist/img/jsoneditor-icons.svg", "img/jsoneditor-icons.svg");
copyVendorAssets("tablesort/tablesort.css");

module.exports = run;
