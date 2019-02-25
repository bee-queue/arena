async function handler(req, res) {
  const { queueName, queueHost } = req.params;
  const data = req.body;

  const { Queues } = req.app.locals;

  const queue = await Queues.get(queueName, queueHost);
  if (!queue) return res.status(404).json({ error: 'queue not found' });

  Queues.set(queue, data);
  return res.sendStatus(200);
}

module.exports = handler;
