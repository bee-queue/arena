const _ = require('lodash');
const Queues = require('../../bull');

const metrics = [
  'redis_version',
  'total_system_memory',
  'used_memory',
  'mem_fragmentation_ratio',
  'connected_clients',
  'blocked_clients'
];

async function handler(req, res) {
  const name = req.params.queueName;
  const queue = await Queues.get(name);
  if (!queue) {
    res
      .status(404)
      .render('dashboard/templates/queueNotFound.hbs', {
        name
      });
  }

  /*
    TODO(randall): get feedback on practicality of this idea
    Description: Get elapsed time for currently processing job

    const jobTypes = ['waiting', 'active', 'completed', 'failed', 'delayed'];
    const jobTimestamps = (await Promise.all(jobTypes.map((type) => queue[`get${_.capitalize(type)}`](0, 0))))
      .map((jobs) => _.first(jobs) || {})
      .map((job) => job['timestamp']);
    const jobTimestampsMap = {};
    for (let typeIndex of _.range(jobTypes.length)) {
      jobTimestampsMap[jobTypes[typeIndex]] = jobTimestamps[typeIndex];
    }
  */

  const getStats = queue.client
    .info()
    .then((doc) => {
      return _mapToObject(new Map(
        doc.split('\r\n')
          .map((line) => line.split(':'))
          .filter((line) => _.includes(metrics, line[0]))
      ));
    });

  const [jobCounts, stats] = await Promise.all([queue.getJobCounts(), getStats]);

  res.render('dashboard/templates/queueDetails.hbs', {
    name,
    jobCounts,
    stats
  });
}

function _mapToObject(map) {
  let obj = {};
  for (let [k, v] of map) {
    obj[k] = v;
  }
  return obj;
}

module.exports = handler;
