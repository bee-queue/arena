const _ = require('lodash');
function prettyBytes(num) {
  const UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  if (!Number.isFinite(num)) {
  	return "Could not retrieve value"
  }

  const neg = num < 0;

  if (neg) {
  	num = -num;
  }

  if (num < 1) {
  	return (neg ? '-' : '') + num + ' B';
  }

  const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), UNITS.length - 1);
  const numStr = Number((num / Math.pow(1000, exponent)).toPrecision(3));
  const unit = UNITS[exponent];

  return (neg ? '-' : '') + numStr + ' ' + unit;
}

const Helpers = {
  getStats: async function(queue) {
    await queue.client.info(); // update queue.client.serverInfo

    const stats = _.pickBy(queue.client.serverInfo, (value, key) => _.includes(this._usefulMetrics, key));
    stats.used_memory = prettyBytes(parseInt(stats.used_memory, 10));
    stats.total_system_memory = prettyBytes(parseInt(stats.total_system_memory, 10));
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
