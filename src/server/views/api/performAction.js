module.exports = function performAction(action) {
  return async function handler(req, res) {
    const {queueName, queueHost, id} = req.params;

    const {Queues} = req.app.locals;
    const queue = await Queues.get(queueName, queueHost);
    if (!queue) return void res.status(404).json({error: 'queue not found'});

    if (!queue.isActionSupported(action)) {
      return void res.status(401).json({
        error: 'unauthorized action',
        details: `queue does not support action ${action}`
      });
    }

    const job = await queue.getJob(id);
    if (!job) return void res.status(404).json({error: 'job not found'});

    try {
      await job[action]();
      return void res.sendStatus(204);
    } catch (e) {
      const body = {
        error: 'queue error',
        details: e.stack
      };
      return void res.status(500).send(body);
    }
  };
};
