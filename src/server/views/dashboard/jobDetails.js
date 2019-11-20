const _ = require('lodash');
const util = require('util');

async function handler(req, res) {
  const { queueName, queueHost, id } = req.params;
  const { json } = req.query;
  const basePath = req.baseUrl;

  const {Queues} = req.app.locals;
  const queue = await Queues.get(queueName, queueHost);
  if (!queue) return res.status(404).render('dashboard/templates/queueNotFound', {basePath, queueName, queueHost});

  const job = await queue.getJob(id);
  if (!job) return res.status(404).render('dashboard/templates/jobNotFound', {basePath, id, queueName, queueHost});

  if (json === 'true') {
    // Omit these private and non-stringifyable properties to avoid circular
    // references parsing errors.
    return res.json(_.omit(job, 'domain', 'queue', '_events', '_eventsCount'));
  }

  let jobState;
  let jobLogs;
  if (queue.IS_BEE) {
    jobState = job.status;
  } else {
    jobState = await job.getState();
    jobLogs = await queue.getJobLogs(id);
    jobLogs = jobLogs.logs;
  }

  return res.render('dashboard/templates/jobDetails', {
    basePath,
    queueName,
    queueHost,
    jobState,
    job,
    jobLogs,
  });
}

module.exports = handler;
