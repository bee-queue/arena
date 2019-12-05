const Queue = require('./queue');
const Job = require('./job');
const JobData = require('./jobData');

class BeeJob extends Job {
  constructor(job) {
    super(job);
  }

  async remove() {
    await this._job.remove();
  }

  async getStatus() {
    return this._job.status;
  }

  async toJSON() {
    const {id, progress, data, options: {timestamp, stacktraces: stacktrace, delay}} = this._job;
    return new JobData({id, progress, data, timestamp, stacktrace, delay});
  }
}

const VALID_STATES = ['waiting', 'active', 'succeeded', 'failed', 'delayed'];
const SUPPORTED_ACTIONS = ['remove'];

module.exports = class BeeQueue extends Queue {
  constructor(queueConfig) {
    const {name} = queueConfig;
    const options = BeeQueue.parseConfig(queueConfig);
    const queue = new BeeQueue(name, options);
    super(queue);
  }

  static parseConfig(queueConfig) {
    const options = {
      redis: this.parseRedisConfig(queueConfig),
      isWorker: false,
      getEvents: false,
      sendEvents: false,
      storeJobs: false,
    };
    const {prefix} = queueConfig;
    if (prefix) options.prefix = prefix;
    return options;
  }

  async getJob(id) {
    const job = this._queue.getJob(id);
    return new BeeJob(job);
  }

  async getJobCounts() {
    const jobCounts = this._queue.checkHealth();
    delete jobCounts.newestJob;
    return jobCounts;
  }

  async getJobs(state, start, size) {
    const page = {};

    if (['failed', 'succeeded'].includes(state)) {
      page.size = size;
    } else {
      page.start = start;
      page.end = start + size - 1;
    }

    let jobs = await this._queue.getJobs(state, page);
    // Filter out Bee jobs that have already been removed by the time the promise resolves
    jobs = jobs.filter((job) => job);
    return jobs.map((j) => new BeeJob(j));
  }

  async addJob(data) {
    const job = await this._queue.createJob(data).save();
    return new BeeJob(job);
  }

  isValidState(state) {
    return VALID_STATES.includes(state);
  }

  isActionSupported(action) {
    return SUPPORTED_ACTIONS.includes(action);
  }

  isPaginationSupported(state) {
    return state !== 'succeeded' && state !== 'failed';
  }
};
