const _ = require('lodash');
const BullQueue = require('./bull');
const BeeQueue = require('./bee');

class Queues {
  constructor(config) {
    this._queues = {};

    this.useCdn = {
      value: true,
      get useCdn() {
        return this.value;
      },
      set useCdn(newValue) {
        this.value = newValue;
      }
    };

    this.setConfig(config);
  }

  list() {
    return this._config.queues;
  }

  setConfig(config) {
    this._config = config;
  }

  async get(queueName, queueHost) {
    const queueConfig = _.find(this._config.queues, {
      name: queueName,
      hostId: queueHost
    });
    if (!queueConfig) return null;

    if (this._queues[queueHost] && this._queues[queueHost][queueName]) {
      return this._queues[queueHost][queueName];
    }

    const {type} = queueConfig;
    let queue;
    if (type === 'bee') {
      queue = new BeeQueue(queueConfig);
    } else {
      queue = new BullQueue(queueConfig);
    }

    this._queues[queueHost] = this._queues[queueHost] || {};
    this._queues[queueHost][queueName] = queue;

    return queue;
  }
}

module.exports = Queues;
