const Builder = require('./builder');
const _ = require('lodash');

class Queues {
  constructor(config) {
    Object.assign(this, {queues: {}, config});
  }

  list() {
    return this.config.queues;
  }

  get(name, hostId) {
    const config = _.find(this.list(), {name, hostId});

    if (!config) {
      return;
    }

    const {queues} = this;
    const hostQueues = queues[hostId] || (queues[hostId] = {});
    return hostQueues[name] || (hostQueues[name] = Builder.queue(config));
  }
}

module.exports = Queues;
