async function handler(req, res) {
  const {queueName, queueHost, id} = req.params;
  const data = req.body;

  const {Queues} = req.app.locals;

  const queue = await Queues.get(queueName, queueHost);
  if (!queue) return res.status(404).json({error: 'queue not found'});

  const job = await queue.getJob(id);
  if (!job) return res.status(404).send({error: 'job not found'});

  try {
    if (job.updateData) {
      await job.updateData(data);
    } else {
      await job.update(data);
    }
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
  return res.sendStatus(200);
}

module.exports = handler;
