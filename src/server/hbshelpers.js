const hbs = require('express-hbs');
const _ = require('lodash');

var helpers = require('handlebars-helpers')({
  handlebars: hbs
});

hbs.registerHelper('adjustedPage', function(currentPage, pageSize, newPageSize) {
  const firstId = (currentPage - 1) * pageSize;
  return _.ceil(firstId / newPageSize) + 1;
});

if (process.env.NODE_ENV !== 'production') {
  hbs.registerHelper('_keys', function(obj) {
    return _.keys(obj);
  });  
}

module.exports = hbs;
