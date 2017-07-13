const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');

module.exports = function() {
  const hbs = exphbs.create({
    defaultLayout: `${__dirname}/views/layout`,
    handlebars,
    partialsDir: `${__dirname}/views/partials/`,
    extname: 'hbs'
  });

  require('handlebars-helpers')({handlebars});
  require('./views/helpers/handlebars')(handlebars);

  const routes = require('./views/routes');
  const app = express();

  const defaultConfig = require(path.join(__dirname, 'config', 'index.json'));

  const Queues = require('./queue');
  app.locals.Queues = new Queues(defaultConfig);
  app.locals.basePath = '';

  app.set('views', `${__dirname}/views`);
  app.set('view engine', 'hbs');
  app.set('json spaces', 2);

  app.engine('hbs', hbs.engine);

  app.use(express.static(path.join(__dirname, '/../../public')));
  app.use(bodyParser.json());

  app.use('/', routes);

  return {
    app,
    Queues: app.locals.Queues
  };
};
