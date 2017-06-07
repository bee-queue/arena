const Queues = require('../../bull');

async function handler(req, res) {
  const { queueName, id } = req.params;

  const queue = await Queues.get(queueName);
  if (!queue) return res.status(404).send({error: 'queue not found'});

  const job = await queue.getJob(id);
  if (!job) return res.status(404).send({error: 'job not found'});

  try {
    await job.remove();
    return res.sendStatus(200);
  } catch (e) {
    const body = {
      error: 'bull error',
      details: e.stack
    };
    return res.status(500).send(body);
  }
}

module.exports = handler;
