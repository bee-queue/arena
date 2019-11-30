const {capitalize} = require('lodash');
const Bull = require('bull');
const Queue = require('./queue');
const Job = require('./job');
const JobData = require('./jobData');

const VALID_STATES = ['waiting', 'active', 'completed', 'failed', 'delayed'];
const SUPPORTED_ACTIONS = ['remove', 'retry'];

class BullJob extends Job {
  constructor(job) {
    super(job);
  }

  async remove() {
    await this._job.remove();
  }

  async retry() {
    await this._job.retry();
  }

  async getStatus() {
    return this._job.getState();
  }


  async toJSON() {
    const {
      id,
      name,
      data,
      attemptsMade,
      failedReason,
      stacktrace,
      returnvalue: returnValue,
      timestamp,
      delay,
      progress
    } = this._job.toJSON();
    return new JobData({
      id,
      name,
      data,
      attemptsMade,
      failedReason,
      stacktrace,
      timestamp,
      delay,
      progress,
      returnValue,
    });
  }
}

module.exports = class BullQueue extends Queue {
  constructor(queueConfig) {
    const {name} = queueConfig;
    const options = BullQueue.parseConfig(queueConfig);
    const queue = Bull(name, options);
    super(queue);
  }

  static parseConfig(queueConfig) {
    const options = {redis: this.parseRedisConfig(queueConfig)};
    const {createClient, prefix} = queueConfig;
    if (createClient) options.createClient = createClient;
    if (prefix) options.prefix = prefix;
    return options;
  }

  async getJob(id) {
    const job = await this._queue.getJob(id);
    return new BullJob(job);
  }

  async getJobCounts() {
    return this._queue.getJobCounts();
  }

  async getJobs(state, start, size) {
    const jobs = await this._queue[`get${capitalize(state)}`](start, start + size - 1);
    return jobs.map((j) => new BullJob(j));
  }

  async addJob(data) {
    const job = await this._queue.add(data, {
      removeOnComplete: false,
      removeOnFail: false
    });
    return new BullJob(job);
  }

  isValidState(state) {
    return VALID_STATES.includes(state);
  }

  isActionSupported(action) {
    return SUPPORTED_ACTIONS.includes(action);
  }
};
