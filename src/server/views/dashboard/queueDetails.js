const sync = require('synchronize');
const Queues = require('../../bull');

function handler(req, res) {
  const name = req.params.queueName;
  const queue = sync.await(Queues.get(name, sync.defer()));

  sync.parallel(() => {
    queue.getActiveCount().asCallback(sync.defer());
    queue.getFailedCount().asCallback(sync.defer());
    queue.getDelayedCount().asCallback(sync.defer());
    queue.getWaitingCount().asCallback(sync.defer());
    queue.getPausedCount().asCallback(sync.defer());
  });

  const [ activeCount, failedCount, delayedCount, waitingCount, pausedCount ] = sync.await();

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
