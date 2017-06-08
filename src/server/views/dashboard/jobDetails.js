const _ = require('lodash');
const util = require('util');
const Queues = require('../../bull');

async function handler(req, res) {
  const { queueName, id } = req.params;
  const { json } = req.query;

  Queues.setConfig(req.app.get('bull config'));
  const queue = await Queues.get(queueName);
  if (!queue) return res.status(404).render('dashboard/templates/queueNotFound.hbs', {name: queueName});

  const job = await queue.getJob(id);
  if (!job) return res.status(404).render('dashboard/templates/jobNotFound.hbs', {id, queueName});

  if (json === 'true') {
    delete job.queue; // avoid circular references parsing error
    return res.json(job);
  }

  const jobState = await job.getState();

  return res.render('dashboard/templates/jobDetails.hbs', {
    queueName,
    jobState,
    job
  });
}

module.exports = handler;
