const _ = require('lodash');
const Queues = require('../../bull');

async function handler(req, res) {
  const { queueName, id } = req.params;
  const { json } = req.query;
  const jobTypes = ['waiting', 'active', 'completed', 'failed', 'delayed'];

  const queue = await Queues.get(queueName);
  if (!queue) res.status(404).render('dashboard/templates/queueNotFound.hbs', {name: queueName});

  const job = await queue.getJob(id);
  if (!job) res.status(404).render('dashboard/templates/jobNotFound.hbs', {id});

  if (json === 'true') {
    return res.json(job);
  }

  return res.render('dashboard/templates/jobDetails.hbs', {
    queueName,
    job
  });
}

module.exports = handler;
