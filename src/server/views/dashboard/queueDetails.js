const Queues = require('../../bull');

async function handler(req, res) {
  const name = req.params.queueName;
  const queue = await Queues.get(name);
  if (!queue) {
    res
      .status(404)
      .render('dashboard/templates/queueNotFound.hbs', {
        name
      });
  }

  const promises = [
    queue.getActiveCount(),
    queue.getFailedCount(),
    queue.getDelayedCount(),
    queue.getWaitingCount(),
    queue.getPausedCount()
  ];

  const [ activeCount, failedCount, delayedCount, waitingCount, pausedCount ] = await Promise.all(promises);

  res.render('dashboard/templates/queueDetails.hbs', {
    name,
    groups: [
      ['active', activeCount],
      ['failed', failedCount],
      ['delayed', delayedCount],
      ['waiting', waitingCount],
      ['paused', pausedCount]
    ]
  });
}

module.exports = handler;
