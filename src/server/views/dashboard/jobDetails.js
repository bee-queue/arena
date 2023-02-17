const _ = require('lodash');
const JobHelpers = require('../helpers/jobHelpers');

async function handler(req, res) {
  const {queueName, queueHost, id} = req.params;
  const {json} = req.query;
  const basePath = req.baseUrl;

  const {Queues, Flows} = req.app.locals;
  const queue = await Queues.get(queueName, queueHost);
  if (!queue)
    return res.status(404).render('dashboard/templates/queueNotFound', {
      basePath,
      queueName,
      queueHost,
    });

  const job = await queue.getJob(id);
  if (!job)
    return res.status(404).render('dashboard/templates/jobNotFound', {
      basePath,
      id,
      queueName,
      queueHost,
      hasFlows: Flows.hasFlows(),
    });

  if (json === 'true') {
    // Omit these private and non-stringifyable properties to avoid circular
    // references parsing errors.
    return res.json(_.omit(job, 'domain', 'queue', '_events', '_eventsCount'));
  }

  const jobState = queue.IS_BEE ? job.status : await job.getState();
  job.showRetryButton = !queue.IS_BEE || jobState === 'failed';
  job.retryButtonText = jobState === 'failed' ? 'Retry' : 'Trigger';
  job.showPromoteButton = !queue.IS_BEE && jobState === 'delayed';
  job.showDeleteRepeatableButton = queue.IS_BULL && job.opts.repeat;
  const stacktraces = queue.IS_BEE ? job.options.stacktraces : job.stacktrace;

  if (!queue.IS_BEE) {
    const logs = await queue.getJobLogs(job.id);
    job.logs = logs.logs || 'No Logs';
  }

  if (queue.IS_BULLMQ) {
    job.parent = JobHelpers.getKeyProperties(job.parentKey);
    const processedCursor = parseInt(req.query.processedCursor, 10) || 0;
    const processedCount = parseInt(req.query.processedCount, 10) || 25;
    const unprocessedCursor = parseInt(req.query.unprocessedCursor, 10) || 0;
    const unprocessedCount = parseInt(req.query.unprocessedCount, 10) || 25;
    job.processedCount = processedCount;
    job.unprocessedCount = unprocessedCount;

    const {
      processed,
      unprocessed,
      nextProcessedCursor,
      nextUnprocessedCursor,
    } = await job.getDependencies({
      processed: {
        cursor: processedCursor,
        count: processedCount,
      },
      unprocessed: {
        cursor: unprocessedCursor,
        count: unprocessedCount,
      },
    });
    const count = await job.getDependenciesCount();
    job.countDependencies = count;

    job.processedCursor = nextProcessedCursor;
    job.unprocessedCursor = nextUnprocessedCursor;
    if (unprocessed && unprocessed.length) {
      job.unprocessedChildren = unprocessed.map((child) => {
        return JobHelpers.getKeyProperties(child);
      });
    }

    if (processed) {
      const childrenKeys = Object.keys(processed);
      job.processedChildren = childrenKeys.map((child) => {
        return JobHelpers.getKeyProperties(child);
      });
    }
  }

  return res.render('dashboard/templates/jobDetails', {
    basePath,
    queueName,
    queueHost,
    jobState,
    job,
    stacktraces,
    hasFlows: Flows.hasFlows(),
  });
}

module.exports = handler;
