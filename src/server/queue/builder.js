const Bee = require('bee-queue');
const Bull = require('bull');
const _ = require('lodash');

const beeOptions = {
  isWorker: false,
  getEvents: false,
  sendEvents: false,
  storeJobs: false
};

const bullOptions = {};

class Builder {
  constructor(config) {
    Object.assign(this, {config});
  }

  queue() {
    const {isBee, queueOptions, specificOptions, config: {name, options}} = this;
    const constructor = isBee ? Bee : Bull;
    const queue = new constructor(
      name,
      Object.assign({}, queueOptions, specificOptions, options)
    );
    queue.IS_BEE = isBee;
    return queue;
  }

  get queueOptions() {
    const {config, redisOptions} = this;
    return _(config)
      .pick('prefix')
      .extend({redis: redisOptions})
      .value();
  }

  get redisOptions() {
    const {config} = this;
    return config.redis || config.url || _.pick(config, 'host', 'port', 'db', 'password');
  }

  get specificOptions() {
    const {isBee} = this;
    return isBee ? beeOptions : bullOptions;
  }

  get isBee() {
    return this._isBee || (this._isBee = this.config.type === 'bee');
  }

  static queue(...args) {
    return new this(...args).queue();
  }
}

module.exports = Builder;
