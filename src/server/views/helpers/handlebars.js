const _ = require('lodash');

const helpers = {
  json(obj, pretty = false) {
    if (pretty) {
      var d = JSON.stringify(obj, null, 2);
      return d;
    }
    return JSON.stringify(obj);
  },
  adjustedPage(currentPage, pageSize, newPageSize) {
    const firstId = (currentPage - 1) * pageSize;
    return _.ceil(firstId / newPageSize) + 1;
  }
};

module.exports = function registerHelpers(hbs) {
  _.each(helpers, (fn, helper) => {
    hbs.registerHelper(helper, fn);
  });
};
