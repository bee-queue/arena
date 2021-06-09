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

  job.parentJobId = JobHelpers.getJobId(job.parentKey);
  const {processed, unprocessed} = await job.getDependencies();
  if (unprocessed) {
    job.children = unprocessed.map((child) => JobHelpers.getJobId(child));
  }
  _.forOwn(processed, function (value, key) {
    job.children.push(JobHelpers.getJobId(key));
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
  const stacktraces = queue.IS_BEE ? job.options.stacktraces : job.stacktrace;

  if (!queue.IS_BEE) {
    const logs = await queue.getJobLogs(job.id);
    job.logs = logs.logs || 'No Logs';
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
