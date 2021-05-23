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

  return res.render('dashboard/templates/flowDetails', {
    basePath,
    connectionName,
    flowHost,
  });
}

module.exports = handler;
