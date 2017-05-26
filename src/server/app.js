const express = require('express');
const path = require('path');
const basicAuth = require('express-basic-auth');

const hbs = require('./hbshelpers');
require('./views/helpers/handlebars')(hbs);
const hbsutils = require('hbs-utils')(hbs);

const routes = require('./views/routes');
const {users} = require('./config/index.json');

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

app.use(basicAuth({
  users,
  challenge: true
}));

app.use('/', routes);

app.listen(4567, () => {
  console.log('Bull UI is running on port 4567');
});

module.exports = app;
