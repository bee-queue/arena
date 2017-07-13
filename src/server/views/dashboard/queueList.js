function handler(req, res) {
  const {Queues} = req.app.locals;
  const queues = Queues.list();

  return res.render('dashboard/templates/queueList', { queues });
}

module.exports = handler;
