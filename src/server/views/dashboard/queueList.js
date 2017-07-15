const Queues = require('../../bull');

function handler(req, res) {
  Queues.setConfig(req.app.get('bull config'));
  const queues = Queues.list();
  const baseURL = req.app.get('baseURL');

  return res.render('dashboard/templates/queueList.hbs', { queues, baseURL });
}

module.exports = handler;
