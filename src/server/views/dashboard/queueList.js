function handler(req, res) {
  const {Queues, Flows} = req.app.locals;
  const queues = Queues.list();
  const basePath = req.baseUrl;

  return res.render('dashboard/templates/queueList', {
    basePath,
    queues,
    hasFlows: Flows.hasFlows(),
  });
}

module.exports = handler;
