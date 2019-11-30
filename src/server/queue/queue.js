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

  async getJob(id) {
  }

  async getJobCounts() {
  }

  async getJobs(state, start, size) {
  }

  async addJob(data, options) {
  }

  isValidState(state) {
  }

  isActionSupported(action) {
  }

  isPaginationSupported(_state) {
    return true;
  }
};
