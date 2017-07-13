const _ = require('lodash');
const QueueHelpers = require('../helpers/queueHelpers');

async function handler(req, res) {
  const { queueName, queueHost, state } = req.params;

  const {Queues} = req.app.locals;
  const queue = await Queues.get(queueName, queueHost);
  if (!queue) return res.status(404).render('dashboard/templates/queueNotFound', {queueName, queueHost});

  let jobTypes;
  if (queue.IS_BEE) {
    jobTypes = ['waiting', 'active', 'succeeded', 'failed', 'delayed'];
  } else {
    jobTypes = ['waiting', 'active', 'completed', 'failed', 'delayed'];
  }
  if (!_.includes(jobTypes, state)) return res.status(400).render('dashboard/templates/jobStateNotFound', {queueName, queueHost, state});

  let jobCounts;
  if (queue.IS_BEE) {
    jobCounts = await queue.checkHealth();
    delete jobCounts.NewestJob;
  } else {
    jobCounts = await QueueHelpers.getJobCounts(queue);
  }

  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 100;

  const startId = (page - 1) * pageSize;
  const endId = startId + pageSize - 1;

  let jobs;
  if (queue.IS_BEE) {
    jobs = await queue.getJobs(state, startId, endId);
  } else {
    jobs = await queue[`get${_.capitalize(state)}`](startId, endId);
  }
  for (let job of jobs) {
    // TODO(randall): polyfill for Bull 1.x, remove when we upgrade fully to Bee
    if (!job.id) job.id = job.jobId;
  }

  let pages = _.range(page - 6, page + 7)
    .filter((page) => page >= 1);
  while (pages.length < 12) {
    pages.push(_.last(pages) + 1);
  }
  pages = pages.filter((page) => page <= _.ceil(jobCounts[state] / pageSize));

  return res.render('dashboard/templates/queueJobsByState', {
    queueName,
    queueHost,
    state,
    jobs,
    jobsInStateCount: jobCounts[state],
    disablePagination: state === 'succeeded' || state === 'failed', // TODO(randall): implement SET pagination in Bee
    currentPage: page,
    pages,
    pageSize,
    lastPage: _.last(pages)
  });
}

module.exports = handler;
