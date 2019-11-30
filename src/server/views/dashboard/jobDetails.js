async function handler(req, res) {
  const { queueName, queueHost, id } = req.params;
  const { json } = req.query;
  const basePath = req.baseUrl;

  const {Queues} = req.app.locals;
  const queue = await Queues.get(queueName, queueHost);
  if (!queue) return res.status(404).render('dashboard/templates/queueNotFound', {basePath, queueName, queueHost});

  const job = await queue.getJob(id);
  if (!job) return res.status(404).render('dashboard/templates/jobNotFound', {basePath, id, queueName, queueHost});
  const jobData = await job.toJSON();

  if (json === 'true') {
    // Omit these private and non-stringifyable properties to avoid circular
    // references parsing errors.
    return res.json(jobData);
  }

  const jobState = await job.getStatus();

  return res.render('dashboard/templates/jobDetails', {
    basePath,
    queueName,
    queueHost,
    jobState,
    job: jobData
  });
}

module.exports = handler;
