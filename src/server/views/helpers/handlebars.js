const _ = require('lodash');

const helpers = {
  json(obj, pretty = false) {
    if (pretty) {
      var d = JSON.stringify(obj, null, 2);
      return d;
    }
    return JSON.stringify(obj);
  }
};

module.exports = function registerHelpers(hbs) {
  _.each(helpers,(fn, helper) => {
    hbs.registerHelper(helper, fn);
  });
};
