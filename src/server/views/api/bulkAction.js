const _ = require('lodash');

function bulkAction(action) {
  return async function handler(req, res) {
    const { queueName, queueHost } = req.params;
    const {Queues} = req.app.locals;
    const queue = await Queues.get(queueName, queueHost);
    if (!queue) return res.status(404).send({error: 'queue not found'});

    if (!queue.isActionSupported(action)) {
      return res.status(401).send({
        error: 'unauthorized action',
        details: `queue does not support action ${action}`
      });
    }

    const {jobs} = req.body;

    try {
      if (!_.isEmpty(jobs)) {
        const jobsPromises = jobs.map((id) => queue.getJob(decodeURIComponent(id)));
        const fetchedJobs = await Promise.all(jobsPromises);

        const actionPromises = fetchedJobs.map(job => job[action]());
        await Promise.all(actionPromises);
        return res.sendStatus(200);
      }
    } catch(e) {
      const body = {
        error: 'queue error',
        details: e.stack
      };
      return res.status(500).send(body);
    }

    return res.sendStatus(200);
  }
}

module.exports = bulkAction;
