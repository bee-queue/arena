const _ = require('lodash');
const Queue = require('@mixmaxhq/bee-queue');
const path = require('path');

class Queues {
  constructor() {
    this._queues = {};
    this._config = null;
  }

  list() {
    return this._config.queues;
  }

  setConfig(config) {
    if (!this._config) {
      this._config = config;
    }
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

    const { name, port, host, db, prefix } = queueConfig;

    const queue = new Queue(name, {
      redis: {
        host,
        port,
        db,
        prefix,
        db
      }
    });

    this._queues[queueHost] = this._queues[queueHost] || {};
    this._queues[queueHost][queueName] = queue;

    return queue;
  }
}

module.exports = new Queues();
