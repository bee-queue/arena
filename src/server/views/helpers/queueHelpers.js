const _ = require('lodash');

const Helpers = {
  getStats: async function(queue) {
    await queue.client.info(); // update queue.client.serverInfo

    return _.pickBy(queue.client.serverInfo, (value, key) => _.includes(this._usefulMetrics, key));
  },

  getJobCounts: async function(queue) {
    return {
      failed: await queue.getFailedCount(),
      delayed: await queue.getDelayedCount(),
      waiting: await queue.getWaitingCount(),
      active: await queue.getActiveCount(),
      completed: await queue.getCompletedCount()
    };
  },

  _usefulMetrics: [
    'redis_version',
    'total_system_memory',
    'used_memory',
    'mem_fragmentation_ratio',
    'connected_clients',
    'blocked_clients'
  ]
};

module.exports = Helpers;
