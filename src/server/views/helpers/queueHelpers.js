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

  const exponent = Math.min(
    Math.floor(Math.log(num) / Math.log(1024)),
    UNITS.length - 1
  );
  const numStr = Number((num / Math.pow(1024, exponent)).toPrecision(3));
  const unit = UNITS[exponent];

  return (neg ? '-' : '') + numStr + ' ' + unit;
}

const Helpers = {
  getStats: async function (queue) {
    const client = await queue.client;
    const doc = await client.info();

    const stats = {};
    if (doc) {
      const totalSystemMemoryPrefix = 'total_system_memory:';
      const usedMemoryPrefix = 'used_memory:';
      const lines = doc.split(/\r?\n/);

      for (const line of lines) {
        for (const metric of Helpers._usefulMetrics) {
          const metricPrefix = metric + ':';
          if (line.indexOf(metricPrefix) === 0) {
            if (
              metricPrefix === totalSystemMemoryPrefix ||
              metricPrefix === usedMemoryPrefix
            ) {
              stats[metric] = formatBytes(
                parseInt(line.substr(metricPrefix.length), 10)
              );
            } else {
              stats[metric] = line.substr(metricPrefix.length);
            }
          }
        }
      }
    }

    return stats;
  },

  isPaused: async function (queue) {
    return queue.isPaused();
  },

  _usefulMetrics: [
    'redis_version',
    'total_system_memory',
    'used_memory',
    'mem_fragmentation_ratio',
    'connected_clients',
    'blocked_clients',
  ],

  /**
   * Valid states for a job in bee queue
   */
  BEE_STATES: ['waiting', 'active', 'succeeded', 'failed', 'delayed'],

  /**
   * Valid states for a job in bull queue
   */
  BULL_STATES: [
    'waiting',
    'active',
    'completed',
    'failed',
    'delayed',
    'paused',
  ],

  /**
   * Valid states for a job in bullmq queue
   */
  BULLMQ_STATES: [
    'waiting',
    'prioritized',
    'active',
    'completed',
    'failed',
    'delayed',
    'paused',
    'waiting-children',
  ],
};

module.exports = Helpers;
