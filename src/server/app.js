const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const hbs = require('express-hbs');
require('handlebars-helpers')({handlebars: hbs});
require('./views/helpers/handlebars')(hbs);
const hbsutils = require('hbs-utils')(hbs);

const routes = require('./views/routes');

const app = express();

const defaultConfig = path.join(__dirname, 'config', 'index.json');
app.set('bull config', require(defaultConfig));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');
app.set('json spaces', 2);

app.engine('hbs', hbs.express4({
  defaultLayout: `${__dirname}/views/layout.hbs`,
  partialsDir: `${__dirname}/views/partials`
}));

app.use(express.static(path.join(__dirname, '/../../public')));
app.use(bodyParser.json());

hbsutils.registerPartials(`${__dirname}/views'`, {
  match: /(^|\/)_[^\/]+\.hbs$/
});

app.use('/', routes);

const server = app.listen(4567, () => {
  console.log('Arena is running on port 4567');
});

module.exports = {app, server};
