const _ = require('lodash');
const Bull = require('bull');
const config = require('../config');

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
  }

  list() {
    const names = _.map(config.queues, 'name');

    return names;
  }

  async get(queueName) {
    if (this._queues.has(queueName)) {
      return this._queues.get(queueName);
    }

    const { name, port, host, options } = _.find(config.queues, { name: queueName });
    const bull = new Bull(name, {
      redis: { port, host }
    });

    protectedFunctions.forEach(fn => bull[fn] = protectFunction);
    this._queues.set(name, bull);
    await bull.isReady();

    return bull;
  }
}

module.exports = new Queues();
