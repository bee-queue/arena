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
    this._config = {...config, queues: config.queues.slice()};

    if (!this._config.queues.length) {
      throw new Error('unsupported configuration: no queues configured');
    }

    if (!this._checkConstructors()) {
      throw new TypeError(
        'as of 3.0.0, bull-arena requires that the queue constructors be provided to Arena'
      );
    }
  }

  _checkConstructors() {
    let hasBull = false,
      hasBee = false,
      hasBullMQ = false;
    for (const queue of this._config.queues) {
      if (queue.type === 'bee') hasBee = true;
      else if (queue.type === 'bullmq') hasBullMQ = true;
      else hasBull = true;

      if (hasBull && hasBee && hasBullMQ) break;
    }

    return (
      (hasBull || hasBee || hasBullMQ) &&
      (!hasBull || !!this._config.Bull) &&
      (!hasBee || !!this._config.Bee) &&
      (!hasBullMQ || !!this._config.BullMQ)
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

    const {
      type,
      name,
      port,
      host,
      db,
      password,
      prefix,
      url,
      redis,
      tls,
    } = queueConfig;

    const redisHost = {host};
    if (password) redisHost.password = password;
    if (port) redisHost.port = port;
    if (db) redisHost.db = db;
    if (tls) redisHost.tls = tls;

    const isBee = type === 'bee';
    const isBullMQ = type === 'bullmq';

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

      const {Bee} = this._config;
      queue = new Bee(name, options);
      queue.IS_BEE = true;
    } else if (isBullMQ) {
      if (queueConfig.createClient)
        options.createClient = queueConfig.createClient;

      const {BullMQ} = this._config;
      const {redis, ...rest} = options;
      queue = new BullMQ(name, {
        connection: redis,
        ...rest,
      });
      queue.IS_BULLMQ = true;
    } else {
      if (queueConfig.createClient)
        options.createClient = queueConfig.createClient;

      if (typeof options.redis === 'string') delete options.redis;

      const {Bull} = this._config;
      if (url) {
        queue = new Bull(name, url, options);
      } else {
        queue = new Bull(name, options);
      }
      queue.IS_BULL = true;
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
   * @param {String} name The name of the Bull job (optional)
   */
  async set(queue, data, name) {
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

      if (name) args.unshift(name);
      return queue.add.apply(queue, args);
    }
  }
}

module.exports = Queues;
