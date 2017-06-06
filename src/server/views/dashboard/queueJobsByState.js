const _ = require('lodash');
const Queues = require('../../bull');

async function handler(req, res) {
  const { queueName, state } = req.params;
  const jobTypes = ['waiting', 'active', 'completed', 'failed', 'delayed'];
  const queue = await Queues.get(queueName);
  if (!queue) return res.status(404).render('dashboard/templates/queueNotFound.hbs', {name: queueName});
  if (!_.includes(jobTypes, state)) return res.status(400).render('dashboard/templates/jobStateNotFound.hbs', {name: queueName, state});

  const jobCounts = await queue.getJobCounts();

  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 100;

  const startId = (page - 1) * pageSize;
  const endId = startId + pageSize - 1;
  let jobs = await queue[`get${_.capitalize(state)}`](startId, endId);
  jobs = _.invokeMap(jobs, 'toJSON');

  let pages = _.range(page - 6, page + 7)
    .filter((page) => page >= 1);
  while (pages.length < 12) {
    pages.push(_.last(pages) + 1);
  }
  pages = pages.filter((page) => page <= _.ceil(jobCounts[state] / pageSize));

  return res.render('dashboard/templates/queueJobsByState.hbs', {
    name: queueName,
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
