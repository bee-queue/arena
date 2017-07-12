const _ = require('lodash');
const Queues = require('../../queue');
const QueueHelpers = require('../helpers/queueHelpers');

async function handler(req, res) {
  const {queueName, queueHost} = req.params;
  Queues.setConfig(req.app.get('queue config'));
  const queue = await Queues.get(queueName, queueHost);
  if (!queue) return res.status(404).render('dashboard/templates/queueNotFound.hbs', {queueName, queueHost});

  const jobCounts = await queue.checkHealth();
  const stats = await QueueHelpers.getStats(queue);

  return res.render('dashboard/templates/queueDetails.hbs', {
    queueName,
    queueHost,
    jobCounts,
    stats
  });
}

module.exports = handler;
