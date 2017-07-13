const _ = require('lodash');
const Bull = require('bull');
const Bee = require('@mixmaxhq/bee-queue');
const path = require('path');

class Queues {
  constructor(config) {
    this._queues = {};

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

    const { type, name, port, host, db, password, prefix } = queueConfig;

    let Queue;
    if (type === 'bee') {
      Queue = Bee;
    } else {
      Queue = Bull;
    }

    const queue = new Queue(name, {
      prefix,
      redis: { port, host, db, password }
    });
    queue.IS_BEE = type === 'bee';
    queue.IS_BULL = type !== 'bee';

    this._queues[queueHost] = this._queues[queueHost] || {};
    this._queues[queueHost][queueName] = queue;

    return queue;
  }
}

module.exports = Queues;
