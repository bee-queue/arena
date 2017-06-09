const _ = require('lodash');
const util = require('util');
const Queues = require('../../bull');

async function handler(req, res) {
  const { queueName, queueHost, id } = req.params;
  const { json } = req.query;

  Queues.setConfig(req.app.get('bull config'));
  const queue = await Queues.get(queueName, queueHost);
  if (!queue) return res.status(404).render('dashboard/templates/queueNotFound.hbs', {queueName, queueHost});

  const job = await queue.getJob(id);
  if (!job) return res.status(404).render('dashboard/templates/jobNotFound.hbs', {id, queueName, queueHost});

  if (json === 'true') {
    delete job.queue; // avoid circular references parsing error
    return res.json(job);
  }

  const jobState = await job.getState();

  return res.render('dashboard/templates/jobDetails.hbs', {
    queueName,
    queueHost,
    jobState,
    job
  });
}

module.exports = handler;
