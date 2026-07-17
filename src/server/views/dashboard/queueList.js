const _ = require('lodash');

function handler(req, res) {
  const {Queues, Flows, activeHostId} = req.app.locals;
  const queues = Queues.list();
  const basePath = req.baseUrl;

  const hosts = _.map(_.groupBy(queues, 'hostId'), (queues, hostId) => ({
    hostId,
    queues,
    active: activeHostId === hostId,
  }));

  return res.render('dashboard/templates/queueList', {
    basePath,
    hosts,
    hasFlows: Flows.hasFlows(),
  });
}

module.exports = handler;
