const _ = require('lodash');
const Bull = require('bull');
const path = require('path');

const envVarConfig = process.env.BULL_UI_CONFIG;
const defaultConfig = path.join(__dirname, '..', 'config', 'index.json');
const config = JSON.parse(require('fs').readFileSync(envVarConfig || defaultConfig));

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

    const queueConfig = _.find(config.queues, { name: queueName });
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
