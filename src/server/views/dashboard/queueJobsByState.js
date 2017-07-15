const _ = require('lodash');
const Queues = require('../../bull');
const QueueHelpers = require('../helpers/queueHelpers');

async function handler(req, res) {
  const { queueName, queueHost, state } = req.params;
  const jobTypes = ['waiting', 'active', 'completed', 'failed', 'delayed'];

  Queues.setConfig(req.app.get('bull config'));
  const queue = await Queues.get(queueName, queueHost);
  if (!queue) return res.status(404).render('dashboard/templates/queueNotFound.hbs', {queueName, queueHost});
  if (!_.includes(jobTypes, state)) return res.status(400).render('dashboard/templates/jobStateNotFound.hbs', {queueName, queueHost, state});

  const jobCounts = await queue.getJobCounts(queue);

  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 100;

  const startId = (page - 1) * pageSize;
  const endId = startId + pageSize - 1;
  const jobs = await queue[`get${_.capitalize(state)}`](startId, endId);

  const baseURL = req.app.get('baseURL');

  let pages = _.range(page - 6, page + 7)
    .filter((page) => page >= 1);
  while (pages.length < 12) {
    pages.push(_.last(pages) + 1);
  }
  pages = pages.filter((page) => page <= _.ceil(jobCounts[state] / pageSize));

  return res.render('dashboard/templates/queueJobsByState.hbs', {
    queueName,
    queueHost,
    baseURL,
    state,
    jobs,
    jobsInStateCount: jobCounts[state],
    currentPage: page,
    pages,
    pageSize,
    lastPage: _.last(pages)
  });
}

module.exports = handler;
