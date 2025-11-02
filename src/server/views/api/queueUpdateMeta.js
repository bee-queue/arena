async function handler(req, res) {
  const {queueName, queueHost} = req.params;
  const data = req.body;

  const {Queues} = req.app.locals;

  const queue = await Queues.get(queueName, queueHost);

  if (!queue) return res.status(404).json({error: 'queue not found'});

  try {
    if (queue.setGlobalConcurrency && queue.setGlobalRateLimit) {
      if (data.concurrency !== null && data.concurrency !== undefined) {
        await queue.setGlobalConcurrency(data.concurrency);
      } else {
        await queue.removeGlobalConcurrency();
      }

      if (
        data.max !== null &&
        data.max !== undefined &&
        data.duration !== null &&
        data.duration !== undefined
      ) {
        await queue.setGlobalRateLimit(data.max, data.duration);
      } else {
        await queue.removeGlobalRateLimit();
      }
    }
  } catch (err) {
    console.log('err', err);
    return res.status(500).json({error: err.message});
  }
  return res.sendStatus(200);
}

module.exports = handler;
