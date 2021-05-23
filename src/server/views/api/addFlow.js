async function handler(req, res) {
  const {connectionName, flowHost} = req.params;
  const {data} = req.body;

  const {Flows} = req.app.locals;

  const flow = await Flows.get(connectionName, flowHost);
  if (!flow) return res.status(404).json({error: 'flow not found'});

  try {
    await Flows.set(flow, data);
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
  return res.sendStatus(200);
}

module.exports = handler;
