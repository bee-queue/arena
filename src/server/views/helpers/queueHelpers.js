const _ = require('lodash');
const prettyBytes = require('pretty-bytes');

const Helpers = {
  getStats: async function(queue) {
    await queue.client.info(); // update queue.client.serverInfo

    const stats = _.pickBy(queue.client.serverInfo, (value, key) => _.includes(this._usefulMetrics, key));
    stats['used_memory'] = prettyBytes(parseInt(stats['used_memory']));
    stats['total_system_memory'] = prettyBytes(parseInt(stats['total_system_memory']));
    return stats;
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
