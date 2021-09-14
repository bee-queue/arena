function handler(req, res) {
  const {Queues, Flows, rootPath} = req.app.locals;
  const queues = Queues.list();
  const basePath = rootPath ? `${rootPath}${req.baseUrl}` : req.baseUrl;

  return res.render('dashboard/templates/queueList', {
    basePath,
    queues,
    hasFlows: Flows.hasFlows(),
  });
}

module.exports = handler;
