const NotImplementedError = require('../error/NotImplementedError');

module.exports = class Queue {
  constructor(queue) {
    this._queue = queue;
    if (new.target === Queue) {
      throw new TypeError("Cannot construct Queue instances directly");
    }
  }

  static parseRedisConfig({port, host, db, password, url, redis, tls}) {
    const redisHost = {host};
    if (password) redisHost.password = password;
    if (port) redisHost.port = port;
    if (db) redisHost.db = db;
    if (tls) redisHost.tls = tls;
    return redis || url || redisHost;
  }

  get redisClient() {
    return this._queue.client;
  }

  async getJob(_id) {
    throw new NotImplementedError();
  }

  async getJobCounts() {
    throw new NotImplementedError();
  }

  async getJobs(_state, _start, _size) {
    throw new NotImplementedError();
  }

  async addJob(_data, _options) {
    throw new NotImplementedError();
  }

  isValidState(_state) {
    throw new NotImplementedError();
  }

  isActionSupported(_action) {
    throw new NotImplementedError();
  }

  isPaginationSupported(_state) {
    return true;
  }
};
