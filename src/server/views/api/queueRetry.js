/**
 * Retry all queue failed jobs
 * @param {*} req 
 * @param {*} res 
 */
async function handler(req, res) {
  const { queueName, queueHost } = req.params;

  const {Queues} = req.app.locals;

  const queue = await Queues.get(queueName, queueHost);
  if (!queue) return res.status(404).send({error: 'queue not found'});

  const promises = [];
  const jobs = await queue.getFailed();
  jobs.forEach(job => promises.push(job.retry()));

  try {
    await await Promise.all(promises);
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
