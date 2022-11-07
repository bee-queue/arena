async function handler(req, res) {
  const {queueName, queueHost, id} = req.params;

  const {Queues} = req.app.locals;
  const queue = await Queues.get(queueName, queueHost);
  if (!queue) return res.status(404).send({error: 'queue not found'});

  const job = await queue.getJob(id);
  if (!job) return res.status(404).send({error: 'job not found'});

  try {
    if (job.opts.repeat.key) {
      await queue.removeRepeatableByKey(job.opts.repeat.key);
    } else {
      await queue.removeRepeatable(job.name, job.opts.repeat);
    }
    return res.sendStatus(200);
  } catch (e) {
    const body = {
      error: 'queue error',
      details: e.stack,
    };
    return res.status(500).send(body);
  }
}

module.exports = handler;
