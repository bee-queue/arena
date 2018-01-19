const _ = require("lodash");
const Handlebars = require("handlebars");

const replacer = (key, value) => {
  if (_.isObject(value)) {
    return _.transform(value, (result, v, k) => {
      result[Handlebars.Utils.escapeExpression(k)] = v;
    });
  } else if (_.isString(value)) {
    return Handlebars.Utils.escapeExpression(value);
  } else {
    return value;
  }
};

const helpers = {
  json(obj, pretty = false) {
    const args = [obj, replacer];
    if (pretty) {
      args.push(2);
    }
    return new Handlebars.SafeString(JSON.stringify(...args));
  },

  adjustedPage(currentPage, pageSize, newPageSize) {
    const firstId = (currentPage - 1) * pageSize;
    return _.ceil(firstId / newPageSize) + 1;
  },

  block(name) {
    var blocks = this._blocks;
    content = blocks && blocks[name];
    return content ? content.join("\n") : null;
  },

  contentFor: function(name, options) {
    var blocks = this._blocks || (this._blocks = {});
    block = blocks[name] || (blocks[name] = []);
    block.push(options.fn(this));
  },

  encodeIdAttr: function(id) {
    return id.replace(/:| /g, "");
  }
};

module.exports = function registerHelpers(hbs) {
  _.each(helpers, (fn, helper) => {
    hbs.registerHelper(helper, fn);
  });
};
