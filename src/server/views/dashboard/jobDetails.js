const _ = require('lodash');
const Queues = require('../../bull');

async function handler(req, res) {
  const { queueName, id } = req.params;
  const { json } = req.query;

  const queue = await Queues.get(queueName);
  if (!queue) return res.status(404).render('dashboard/templates/queueNotFound.hbs', {name: queueName});

  const job = await queue.getJob(id);
  if (!job) return res.status(404).render('dashboard/templates/jobNotFound.hbs', {id});

  if (json === 'true') {
    return res.json(job);
  }

  const jobState = await job.getState();

  return res.render('dashboard/templates/jobDetails.hbs', {
    queueName,
    jobState,
    job: job.toJSON() // toJSON() automatically converts progress to a number
  });
}

module.exports = handler;
