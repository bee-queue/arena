async function handler(req, res) {
  const {Queues} = req.app.locals;
  const queues = Queues.list();
  const basePath = req.baseUrl;
  let queuesList = [];
  for (const queueList of queues) {
    let stats = {};
    const queue = await Queues.get(queueList.name, queueList.hostId);
    const IS_BEE = queue.IS_BEE;
    if (!IS_BEE) {
      stats = await queue.getJobCounts();
    }
    queuesList.push(Object.assign({IS_BEE}, queueList, {stats}));
  }
  return res.render('dashboard/templates/queueList', {basePath, queues: queuesList});
}

module.exports = handler;
