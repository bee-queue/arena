const NotImplementedError = require('../error/NotImplementedError');

module.exports = class Job {
  constructor(job) {
    this._job = job;
    if (new.target === Job) {
      throw new TypeError("Cannot construct Job instances directly");
    }
  }

  async remove() {
    throw new NotImplementedError();
  }

  async getStatus() {
    throw new NotImplementedError();
  }

  async toJSON() {
    throw new NotImplementedError();
  }
};
