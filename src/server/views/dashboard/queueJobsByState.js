const _ = require('lodash');
const sync = require('synchronize');
const Queues = require('../../bull');

function handler(req, res) {
  const { queueName, state } = req.params;
  const queue = sync.await(Queues.get(queueName, sync.defer()));

  // Look at this unsafe metaprogramming, fix me some time please.
  // Just pull the first 10 jobs, need to support pagination.
  let jobs = sync.await(queue[`get${_.capitalize(state)}`](0, 9).asCallback(sync.defer()));

  jobs = _.invokeMap(jobs, 'toJSON');

  res.render('dashboard/templates/queueJobsByState.hbs', {
    name: queueName, state, jobs
  });
}

module.exports = handler;
