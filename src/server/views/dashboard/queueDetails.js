const _ = require('lodash');
const QueueHelpers = require('../helpers/queueHelpers');

async function handler(req, res) {
  const {queueName, queueHost} = req.params;
  const {Queues} = req.app.locals;
  const queue = await Queues.get(queueName, queueHost);
  if (!queue) return res.status(404).render('dashboard/templates/queueNotFound', {queueName, queueHost});

  const jobCounts = await queue.getJobCounts(queue);
  const stats = await QueueHelpers.getStats(queue);

  return res.render('dashboard/templates/queueDetails', {
    queueName,
    queueHost,
    jobCounts,
    stats
  });
}

module.exports = handler;
