module.exports = class Job {
  constructor(job) {
    this._job = job;
    if (new.target === Job) {
      throw new TypeError("Cannot construct Job instances directly");
    }
  }

  async remove() {
  }

  async getStatus() {
  }

  async toJSON() {
  }
};
