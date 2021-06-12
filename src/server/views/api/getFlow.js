function processFlow(flow) {
  const {job, children} = flow;
  const queueName = job.queueName;

  if (children && children.length > 0) {
    return {
      job: {...job, queueName},
      children: children.map((child) => processFlow(child)),
    };
  } else {
    return {
      job: {...job, queueName},
    };
  }
}

async function handler(req, res) {
  const {connectionName, flowHost} = req.params;
  const {depth, jobId, maxChildren, queueName} = req.query;
  const {Flows} = req.app.locals;
  const flow = await Flows.get(connectionName, flowHost);
  if (!flow) return res.status(404).json({error: 'flow not found'});
  try {
    const flowTree = await flow.getFlow({
      id: jobId,
      queueName,
      depth: Number(depth),
      maxChildren: Number(maxChildren),
    });
    const processedFlow = processFlow(flowTree);
    const {job} = flowTree;
    return res.status(200).json(processedFlow);
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
}
module.exports = handler;
