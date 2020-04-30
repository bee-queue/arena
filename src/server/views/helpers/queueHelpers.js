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

/**
 * Parses a Redis server info string as returned by `INFO`, generating an
 * output object populated with fields based upon key-value pairs read.
 * 
 * @param {string} rawServerInfo - Redis server info as returned from the
 * `INFO` command.
 * 
 * @returns {object} Returns a dictionary with key-value pairs based upon
 * the parsed server info. 
 */
function parseRedisServerInfo(rawServerInfo) {
  // Return just an empty object if we've not been given a proper string.
  if (typeof rawServerInfo !== 'string') {
    return {};
  }

  const out = {};
  const lines = rawServerInfo.split('\r\n');
  for (const line of lines) {
    // Skip section names and empty lines.
    if (line.startsWith('#') || !line.length) {
      continue;
    }
    // Split our line into key:value components. Note that it is possible
    // for the value to contain the colon character, so we must take care
    // to have all potential components joined rather than assuming there
    // is only one.
    const [key, ...valueComponents] = line.split(':');
    const value = valueComponents.join(':');
    if (value) {
      out[key] = value;
    }
  }

  return out;
}

const Helpers = {
  getStats: async function(queue) {
    const rawServerInfo = await queue.client.info();
    const serverInfo = parseRedisServerInfo(rawServerInfo);

    const stats = _.pickBy(serverInfo, (value, key) => _.includes(this._usefulMetrics, key));
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

  /**
   * Valid states for a job in bee queue
   */
  BEE_STATES: ['waiting', 'active', 'succeeded', 'failed', 'delayed'],

  /**
   * Valid states for a job in bull queue
   */
  BULL_STATES: ['waiting', 'active', 'completed', 'failed', 'delayed']
};

module.exports = Helpers;
