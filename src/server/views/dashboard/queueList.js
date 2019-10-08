async function handler(req, res) {
  const {Queues} = req.app.locals;
  const queues = Queues.list();
  const basePath = req.baseUrl;

  for (let queue of queues){
    queue.jobs = await Queues.get(queue.name, queue.hostId).then(queue=>queue.getJobCounts())
  }
  
  return res.render('dashboard/templates/queueList', { basePath, queues });
}

module.exports = handler;
