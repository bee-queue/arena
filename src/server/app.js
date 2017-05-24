const express = require('express');
const hbs = require('express-hbs');
require('./views/helpers/handlebars')(hbs);
const hbsutils = require('hbs-utils')(hbs);
const path = require('path');
const auth = require('./auth');

const routes = require('./views/routes');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');

app.engine('hbs', hbs.express4({
  defaultLayout: `${__dirname}/views/layout.hbs`
}));

app.use(express.static(path.join(__dirname, '/../../public')));

hbsutils.registerPartials(`${__dirname}/views'`, {
  match: /(^|\/)_[^\/]+\.hbs$/
});

app.use(auth);

app.use('/', routes);

app.listen(4567, () => {
  console.log('Bull UI is running on port 4567');
});

module.exports = app;
