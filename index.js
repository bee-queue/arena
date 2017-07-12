const appConstructor = require('./src/server/app');

function run(config, listenOpts) {
  const app = appConstructor();

  if (config) app.set('queue config', config);

  const port = (listenOpts && listenOpts.port) || 4567;

  if (listenOpts) {
    const {prefix} = listenOpts;
    if (prefix) app.locals.basePath = prefix;
  }

  app.listen(port, () => {
    console.log(`Arena is running on port ${port}`);
  });

  return app;
}

if (require.main === module) run();

module.exports = run;
