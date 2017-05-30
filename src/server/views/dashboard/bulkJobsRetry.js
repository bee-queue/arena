const Queues = require('../../bull');
const _ = require('lodash');

async function handler(req, res) {
  const { queueName } = req.params;

  const queue = await Queues.get(queueName);
  if (!queue) return res.status(404).send({error: 'queue not found'});

  const {jobsToRetry} = req.body;

  try {
    if (!_.isEmpty(jobsToRetry)) {
      const getJobs = jobsToRetry.map((id) => queue.getJob(id));
      const jobs = await Promise.all(getJobs);

      const retryJobs = jobs.map((job) => job.retry());
      await Promise.all(retryJobs);
      return res.sendStatus(200);
    }
  } catch(e) {
    debugger
    const body = {
      error: 'bull error',
      details: e.stack
    };
    return res.status(500).send(body);
  }

  return res.sendStatus(200);
}

module.exports = handler;
