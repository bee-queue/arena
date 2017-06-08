const _ = require('lodash');
const Bull = require('bull');
const path = require('path');

/**
 * This function simply throws an exception when called, this is used to protect
 * some Bull functions that should never be called in this module.
 */
function protectFunction() {
  throw new Error('This function is protected !');
}

const protectedFunctions = ['process','start','add','setHandler','empty','run','clean','processJob','processJobs','startMoveUnlockedJobsToWait','moveUnlockedJobsToWait','updateDelayTimer','resume','pause'];

class Queues {
  constructor() {
    this._queues = new Map();
    this._config = null;
  }

  list() {
    const names = _.map(this._config.queues, 'name');

    return names;
  }

  setConfig(config) {
    if (!this._config) {
      this._config = config;
    }
  }

  async get(queueName) {
    if (this._queues.has(queueName)) {
      return this._queues.get(queueName);
    }

    const queueConfig = _.find(this._config.queues, { name: queueName });
    if (!queueConfig) {
      return null;
    }

    const { name, port, host, options } = queueConfig;
    const bull = new Bull(name, {
      redis: { port, host }
    });
    protectedFunctions.forEach(fn => bull[fn] = protectFunction);
    this._queues.set(name, bull);

    return bull;
  }
}

module.exports = new Queues();
