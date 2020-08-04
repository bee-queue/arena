const _ = require('lodash');

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
      },
    };

    this.setConfig(config);
  }

  list() {
    return this._config.queues;
  }

  setConfig(config) {
    this._config = { ...config, queues: config.queues.slice() };

    if (!this._checkConstructors()) {
      throw new TypeError(
        'as of 3.0.0, bull-arena requires that the queue constructors be provided to Arena'
      );
    }
  }

  _checkConstructors() {
    let hasBull = false,
      hasBee = false;
    for (const queue of this._config.queues) {
      if (queue.type === 'bee') hasBee = true;
      else hasBull = true;

      if (hasBull && hasBee) break;
    }

    return (
      (hasBull || hasBee) && (!hasBull || !!this._config.Bull) && (!hasBee || !!this._config.Bee)
    );
  }

  async get(queueName, queueHost) {
    const queueConfig = _.find(this._config.queues, {
      name: queueName,
      hostId: queueHost,
    });
    if (!queueConfig) return null;

    if (this._queues[queueHost] && this._queues[queueHost][queueName]) {
      return this._queues[queueHost][queueName];
    }

    const { type, name, port, host, db, password, prefix, url, redis, tls } = queueConfig;

    const redisHost = { host };
    if (password) redisHost.password = password;
    if (port) redisHost.port = port;
    if (db) redisHost.db = db;
    if (tls) redisHost.tls = tls;

    const isBee = type === 'bee';

    const options = {
      redis: redis || url || redisHost,
    };
    if (prefix) options.prefix = prefix;

    let queue;
    if (isBee) {
      _.extend(options, {
        isWorker: false,
        getEvents: false,
        sendEvents: false,
        storeJobs: false,
      });

      const { Bee } = this._config;
      queue = new Bee(name, options);
      queue.IS_BEE = true;
    } else {
      if (queueConfig.createClient) options.createClient = queueConfig.createClient;

      const { Bull } = this._config;
      queue = new Bull(name, options);
    }

    this._queues[queueHost] = this._queues[queueHost] || {};
    this._queues[queueHost][queueName] = queue;

    return queue;
  }

  /**
   * Creates and adds a job with the given `data` to the given `queue`.
   *
   * @param {Object} queue A bee or bull queue class
   * @param {Object} data The data to be used within the job
   */
  async set(queue, data) {
    if (queue.IS_BEE) {
      return queue.createJob(data).save();
    } else {
      const args = [
        data,
        {
          removeOnComplete: false,
          removeOnFail: false,
        },
      ];

      if (data.name) args.unshift(data.name);
      return queue.add.apply(queue, args);
    }
  }
}

module.exports = Queues;
