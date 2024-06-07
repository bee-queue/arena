const QueueHelpers = require('../helpers/queueHelpers');

async function handler(req, res) {
  const {queueName, queueHost} = req.params;
  const {Queues, Flows} = req.app.locals;
  const queue = await Queues.get(queueName, queueHost);
  const basePath = req.baseUrl;

  if (!queue)
    return res.status(404).render('dashboard/templates/queueNotFound', {
      basePath,
      queueName,
      queueHost,
      hasFlows: Flows.hasFlows(),
    });

  let jobCounts, isPaused;
  if (queue.IS_BEE) {
    jobCounts = await queue.checkHealth();
    delete jobCounts.newestJob;
  } else if (queue.IS_BULLMQ) {
    jobCounts = await queue.getJobCounts(...QueueHelpers.BULLMQ_STATES);
    const groupStatus = await queue.getGroupsCountByStatus();
    /**
     * adding any groups that are waiting or maxed to the prioritized count
     * groups that are waiting are waiting for a free worker
     * groups that are maxed has hit a concurrency limit and is waiting for
     * the current running job to finish
     *
     * why prioritized? since all datasource jobs have a priority assigned,
     * the go into the prioritized bucket
     */
    jobCounts['prioritized'] += groupStatus['waiting'] + groupStatus['maxed'];
  } else {
    jobCounts = await queue.getJobCounts();
  }
  const stats = await QueueHelpers.getStats(queue);

  if (!queue.IS_BEE) {
    isPaused = await QueueHelpers.isPaused(queue);
  }

  return res.render('dashboard/templates/queueDetails', {
    basePath,
    isPaused,
    queueName,
    queueHost,
    queueIsBee: !!queue.IS_BEE,
    queueIsBullMQ: !!queue.IS_BULLMQ,
    hasFlows: Flows.hasFlows(),
    jobCounts,
    stats,
  });
}

module.exports = handler;
