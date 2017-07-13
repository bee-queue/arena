const Arena = require('./src/server/app');

function run(config, listenOpts) {
  const {app, Queues} = Arena();

  if (config) Queues.setConfig(config);

  app.locals.basePath = (listenOpts && listenOpts.prefix) || app.locals.basePath;

  const port = (listenOpts && listenOpts.port) || 4567;
  app.listen(port, () => {
    console.log(`Arena is running on port ${port}`);
  });

  return app;
}

if (require.main === module) run();

module.exports = run;
