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
    this._queues = {};
    this._config = null;
  }

  list() {
    return this._config.queues;
  }

  setConfig(config) {
    if (!this._config) {
      this._config = config;
    }
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

    const { name, port, host, db, password, options } = queueConfig;
    const bull = new Bull(name, {
      redis: { port, host, db, password }
    });
    protectedFunctions.forEach(fn => bull[fn] = protectFunction);

    this._queues[queueHost] = this._queues[queueHost] || {};
    this._queues[queueHost][queueName] = bull;

    return bull;
  }
}

module.exports = new Queues();
