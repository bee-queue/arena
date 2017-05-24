const _ = require('lodash');
const Queues = require('../../bull');

async function handler(req, res) {
  const { queueName, state } = req.params;
  const queue = await Queues.get(queueName);
  if (!queue) {
    res
      .status(404)
      .render('dashboard/templates/queueNotFound.hbs', {
        name: queueName
      });
  }

  // Look at this unsafe metaprogramming, fix me some time please.
  // Just pull the first 10 jobs, need to support pagination.
  let jobs = await queue[`get${_.capitalize(state)}`](0, 9);

  jobs = _.invokeMap(jobs, 'toJSON');

  res.render('dashboard/templates/queueJobsByState.hbs', {
    name: queueName, state, jobs
  });
}

module.exports = handler;
