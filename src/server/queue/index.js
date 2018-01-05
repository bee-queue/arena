const _ = require('lodash');
const Bull = require('bull');
const Bee = require('bee-queue');
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

    const { type, name, port, host, db, password, prefix, url, redis } = queueConfig;

    const redisHost = { host };
    if (password) redisHost.password = password;
    if (port) redisHost.port = port;
    if (db) redisHost.db = db;

    const isBee = type === 'bee';

    let queue;
    if (isBee) {
      const options = {
        redis: redis || url || redisHost,
        isWorker: false,
        getEvents: false,
        sendEvents: false,
        storeJobs: false
      };
      if (prefix) options.prefix = prefix;

      queue = new Bee(name, options);
      queue.IS_BEE = true;
    } else {
      const options = {
        redis: redis || redisHost
      };
      if (prefix) options.prefix = prefix;

      queue = new Bull(name, options || url);
    }

    this._queues[queueHost] = this._queues[queueHost] || {};
    this._queues[queueHost][queueName] = queue;

    return queue;
  }
}

module.exports = Queues;
