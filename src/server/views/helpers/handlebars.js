const crypto = require('crypto');
const _ = require('lodash');
const Handlebars = require('handlebars');

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

// For jobs that don't have a valid ID, produce a random ID we can use in its place.
const idMapping = new WeakMap();

const helpers = {
  json(obj, pretty = false) {
    const args = [obj, replacer];
    if (pretty) {
      args.push(2);
    }
    return new Handlebars.SafeString(JSON.stringify(...args));
  },

  isNumber(operand) {
    return parseInt(operand, 10).toString() === String(operand);
  },

  adjustedPage(currentPage, pageSize, newPageSize) {
    const firstId = (currentPage - 1) * pageSize;
    return _.ceil(firstId / newPageSize) + 1;
  },

  block(name) {
    const blocks = this._blocks;
    const content = blocks && blocks[name];
    return content ? content.join('\n') : null;
  },

  contentFor(name, options) {
    const blocks = this._blocks || (this._blocks = {});
    const block = blocks[name] || (blocks[name] = []);
    block.push(options.fn(this));
  },

  hashIdAttr(obj) {
    const { id } = obj;
    if (typeof id === 'string') {
      return crypto.createHash('sha256').update(id).digest('hex');
    }
    let mapping = idMapping.get(obj);
    if (!mapping) {
      mapping = crypto.randomBytes(32).toString('hex');
      idMapping.set(obj, mapping);
    }
    return mapping;
  },
};

module.exports = function registerHelpers(hbs, { queues }) {
  _.each(helpers, (fn, helper) => {
    hbs.registerHelper(helper, fn);
  });

  hbs.registerHelper('useCdn', () => {
    return queues.useCdn;
  });
};
