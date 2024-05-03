const _ = require('lodash');

const ACTIONS = ['clean', 'remove', 'retry', 'promote'];

function bulkAction(action) {
  return async function handler(req, res) {
    if (!_.includes(ACTIONS, action)) {
      res.status(401).send({
        error: 'unauthorized action',
        details: `action ${action} not permitted`,
      });
    }

    const {queueName, queueHost} = req.params;
    const {Queues} = req.app.locals;
    const queue = await Queues.get(queueName, queueHost);
    if (!queue) return res.status(404).send({error: 'queue not found'});

    const {jobs, queueState} = req.body;

    try {
      if (!_.isEmpty(jobs) && job.length > 0) {
        const jobsPromises = jobs.map((id) =>
          queue.getJob(decodeURIComponent(id))
        );
        const fetchedJobs = await Promise.all(jobsPromises);
        const actionPromises =
          action === 'retry'
            ? fetchedJobs.map((job) => {
                if (
                  queueState === 'failed' &&
                  typeof job.retry === 'function'
                ) {
                  return job.retry();
                } else {
                  return Queues.set(queue, job.data, job.name);
                }
              })
            : fetchedJobs.map((job) => job[action]());
        await Promise.all(actionPromises);
        return res.sendStatus(200);
      } else if (action === 'clean') {
        await queue.clean(1000, queueState);
        return res.sendStatus(200);
      }
    } catch (e) {
      const body = {
        error: 'queue error',
        details: e.stack,
      };
      return res.status(500).send(body);
    }

    return res.sendStatus(200);
  };
}

module.exports = bulkAction;
