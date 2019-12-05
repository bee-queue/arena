const _ = require('lodash');

/**
 * Formats the number into "human readable" number/
 *
 * @param {Number} num The number to format.
 * @returns {string} The number as a string or error text if we couldn't
 *   format it.
 */
function formatBytes(num) {
  if (!Number.isFinite(num)) {
    return 'Could not retrieve value';
  }

  const UNITS = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

  const neg = num < 0;
  if (neg) num = -num;

  if (num < 1) {
    return (neg ? '-' : '') + num + ' B';
  }

  const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1024)), UNITS.length - 1);
  const numStr = Number((num / Math.pow(1024, exponent)).toPrecision(3));
  const unit = UNITS[exponent];

  return (neg ? '-' : '') + numStr + ' ' + unit;
}

const Helpers = {
  getStats: async function(queue) {
    await queue.redisClient.info(); // update queue.client.serverInfo

    const stats = _.pickBy(queue.redisClient.serverInfo, (value, key) => this._usefulMetrics.includes(key));
    stats.used_memory = formatBytes(parseInt(stats.used_memory, 10));
    stats.total_system_memory = formatBytes(parseInt(stats.total_system_memory, 10));
    return stats;
  },

  _usefulMetrics: [
    'redis_version',
    'total_system_memory',
    'used_memory',
    'mem_fragmentation_ratio',
    'connected_clients',
    'blocked_clients'
  ],
};

module.exports = Helpers;
