const _ = require('lodash');
const util = require('util');

async function handler(req, res) {
  const { queueName, queueHost, id } = req.params;
  const { json } = req.query;
  const basePath = req.baseUrl;

  const { Queues } = req.app.locals;
  const queue = await Queues.get(queueName, queueHost);
  if (!queue)
    return res
      .status(404)
      .render('dashboard/templates/queueNotFound', { basePath, queueName, queueHost });

  const job = await queue.getJob(id);
  if (!job)
    return res
      .status(404)
      .render('dashboard/templates/jobNotFound', { basePath, id, queueName, queueHost });

  if (json === 'true') {
    // Omit these private and non-stringifyable properties to avoid circular
    // references parsing errors.
    return res.json(_.omit(job, 'domain', 'queue', '_events', '_eventsCount'));
  }

  const jobState = queue.IS_BEE ? job.status : await job.getState();
  job.showRetryButton = !queue.IS_BEE || jobState === 'failed';
  job.retryButtonText = jobState === 'failed' ? 'Retry' : 'Trigger';
  const stacktraces = queue.IS_BEE ? job.options.stacktraces : job.stacktrace;

  return res.render('dashboard/templates/jobDetails', {
    basePath,
    queueName,
    queueHost,
    jobState,
    job,
    stacktraces,
  });
}

module.exports = handler;
