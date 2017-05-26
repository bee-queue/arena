const hbs = require('express-hbs');
const _ = require('lodash');

var helpers = require('handlebars-helpers')({
  handlebars: hbs
});

hbs.registerHelper('adjustedPage', function(currentPage, pageSize, newPageSize) {
  const firstId = (currentPage - 1) * pageSize;
  return _.ceil(firstId / newPageSize) + 1;
});


module.exports = hbs;
