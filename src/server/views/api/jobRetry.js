async function handler(req, res) {
  const { queueName, queueHost, id } = req.params;

  const {Queues} = req.app.locals;

  const queue = await Queues.get(queueName, queueHost);
  if (!queue) return res.status(404).send({error: 'queue not found'});

  const job = await queue.getJob(id);
  if (!job) return res.status(404).send({error: 'job not found'});

  try {
    const jobState = queue.IS_BEE ? job.status : await job.getState();

    if (jobState === 'failed' && typeof job.retry === 'function') {
      await job.retry();
    } else {
      // On-demand jobs should not have repeat settings
      if (job.opts) {
        job.opts.repeat = undefined;
      }

      await Queues.set(queue, job);
    }

    return res.sendStatus(200);
  } catch (e) {
    const body = {
      error: 'queue error',
      details: e.stack
    };
    return res.status(500).send(body);
  }
}

module.exports = handler;
