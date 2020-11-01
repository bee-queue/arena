const QueueHelpers = require('../helpers/queueHelpers');

async function handler(req, res) {
  const { queueName, queueHost } = req.params;
  const { Queues } = req.app.locals;
  const queue = await Queues.get(queueName, queueHost);
  const basePath = req.baseUrl;
  if (!queue)
    return res
      .status(404)
      .render('dashboard/templates/queueNotFound', { basePath, queueName, queueHost });

  let jobCounts;
  if (queue.IS_BEE) {
    jobCounts = await queue.checkHealth();
    delete jobCounts.newestJob;
  } else if (queue.IS_BULLMQ) {
    jobCounts = await queue.getJobCounts(...QueueHelpers.BULL_STATES);
  } else {
    jobCounts = await queue.getJobCounts();
  }
  const stats = await QueueHelpers.getStats(queue);

  return res.render('dashboard/templates/queueDetails', {
    basePath,
    queueName,
    queueHost,
    queueIsBee: !!queue.IS_BEE,
    jobCounts,
    stats,
  });
}

module.exports = handler;
