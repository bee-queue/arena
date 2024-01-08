const flowHelpers = require('../helpers/flowHelpers');

async function handler(req, res) {
  const {connectionName, flowHost} = req.params;
  const {data} = req.body;

  const {Flows} = req.app.locals;

  const flow = await Flows.get(connectionName, flowHost);
  if (!flow) return res.status(404).json({error: 'flow not found'});

  try {
    const flowTree = await Flows.set(flow, data);
    const processedFlow = flowHelpers.processFlow(flowTree);

    return res.status(200).json(processedFlow);
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
}

module.exports = handler;
