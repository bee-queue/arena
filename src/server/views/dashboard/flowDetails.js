const QueueHelpers = require('../helpers/queueHelpers');

async function handler(req, res) {
  const {connectionName, flowHost} = req.params;
  const {Flows} = req.app.locals;
  const flow = await Flows.get(connectionName, flowHost);
  const basePath = req.baseUrl;

  if (!flow)
    return res.status(404).render('dashboard/templates/flowNotFound', {
      basePath,
      connectionName,
      flowHost,
    });

  const stats = await QueueHelpers.getStats(flow);

  return res.render('dashboard/templates/flowDetails', {
    basePath,
    connectionName,
    flowHost,
    stats,
  });
}

module.exports = handler;
