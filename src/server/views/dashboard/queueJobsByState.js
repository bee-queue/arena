const includes = require('lodash.includes');
const pick = require('lodash.pick');
const range = require('lodash.range');
const capitalize = require('lodash.capitalize');
const last = require('lodash.last');
const ceil = require('lodash.ceil');
const {
  BEE_STATES,
  BULL_STATES,
  BULLMQ_STATES,
} = require('../helpers/queueHelpers');
const JobHelpers = require('../helpers/jobHelpers');

function getStates(queue) {
  if (queue.IS_BEE) {
    return BEE_STATES;
  }
  if (queue.IS_BULLMQ) {
    return BULLMQ_STATES;
  }
  return BULL_STATES;
}
/**
 * Determines if the requested job state lookup is valid.
 *
 * @param {String} state
 * @param {Object} queue Queue that contains which queue package is used (bee, bull or bullmq)
 *
 * @return {Boolean}
 */
function isValidState(state, queue) {
  const validStates = getStates(queue);
  return includes(validStates, state);
}

async function handler(req, res) {
  if (req.params.ext === 'json') return _json(req, res);

  return _html(req, res);
}

/**
 * Returns the queue jobs in the requested state as a json document.
 *
 * @prop {Object} req express request object
 * @prop {Object} res express response object
 */
async function _json(req, res) {
  const {queueName, queueHost, state} = req.params;
  const {Queues} = req.app.locals;
  const queue = await Queues.get(queueName, queueHost);
  if (!queue) return res.status(404).json({message: 'Queue not found'});

  if (!isValidState(state, queue))
    return res.status(400).json({message: `Invalid state requested: ${state}`});

  let jobs;
  if (queue.IS_BEE) {
    jobs = await queue.getJobs(state, {size: 1000});
    jobs = jobs.map((j) =>
      pick(j, 'id', 'progress', 'data', 'options', 'status')
    );
  } else {
    const words = state.split('-');
    const finalStateName = words.map((word) => capitalize(word)).join('');
    jobs = await queue[`get${finalStateName}`](0, 1000);
    jobs = jobs.map((j) => j.toJSON());
  }

  const filename = `${queueName}-${state}-dump.json`;

  res.setHeader('Content-disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-type', 'application/json');
  res.write(JSON.stringify(jobs, null, 2), () => res.end());
}

/**
 * Renders an html view of the queue jobs in the requested state.
 *
 * @prop {Object} req express request object
 * @prop {Object} res express response object
 */
async function _html(req, res) {
  const {queueName, queueHost, state} = req.params;
  const {Queues, Flows} = req.app.locals;
  const queue = await Queues.get(queueName, queueHost);
  const basePath = req.baseUrl;
  if (!queue)
    return res.status(404).render('dashboard/templates/queueNotFound', {
      basePath,
      queueName,
      queueHost,
    });

  if (!isValidState(state, queue))
    return res.status(400).json({message: `Invalid state requested: ${state}`});

  let jobCounts;
  if (queue.IS_BEE) {
    jobCounts = await queue.checkHealth();
    delete jobCounts.newestJob;
  } else {
    jobCounts = await queue.getJobCounts();
  }

  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 100;
  const order = req.query.order || 'desc';

  const startId = (page - 1) * pageSize;
  const endId = startId + pageSize - 1;

  let jobs;
  if (queue.IS_BEE) {
    const pageOptions = {};

    if (['failed', 'succeeded'].includes(state)) {
      pageOptions.size = pageSize;
    } else {
      pageOptions.start = startId;
      pageOptions.end = endId;
    }

    jobs = await queue.getJobs(state, pageOptions);

    // Filter out Bee jobs that have already been removed by the time the promise resolves
    jobs = jobs.filter((job) => job);
  } else {
    const stateTypes = state === 'waiting' ? ['wait', 'paused'] : state;
    jobs = await queue.getJobs(stateTypes, startId, endId, order === 'asc');
  }

  for (const job of jobs) {
    const jobState = queue.IS_BEE ? job.status : await job.getState();
    job.showRetryButton = !queue.IS_BEE || jobState === 'failed';
    job.retryButtonText = jobState === 'failed' ? 'Retry' : 'Trigger';
    job.showPromoteButton = !queue.IS_BEE && jobState === 'delayed';
    job.parent = JobHelpers.getKeyProperties(job.parentKey);
  }

  let pages = range(page - 6, page + 7).filter((page) => page >= 1);
  while (pages.length < 12) {
    pages.push(last(pages) + 1);
  }
  pages = pages.filter((page) => page <= ceil(jobCounts[state] / pageSize));
  const disablePromote = !(state === 'delayed' && !queue.IS_BEE);
  const disableRetry = !(
    state === 'failed' ||
    (state === 'delayed' && !queue.IS_BEE)
  );

  return res.render('dashboard/templates/queueJobsByState', {
    basePath,
    queueName,
    queueHost,
    state,
    jobs,
    jobsInStateCount: jobCounts[state],
    disablePagination:
      queue.IS_BEE && (state === 'succeeded' || state === 'failed'),
    disableOrdering: queue.IS_BEE,
    disablePromote,
    disableRetry,
    currentPage: page,
    hasFlows: Flows.hasFlows(),
    pages,
    pageSize,
    lastPage: last(pages),
    order,
  });
}

module.exports = handler;
