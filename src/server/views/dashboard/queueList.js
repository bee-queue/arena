const Queues = require('../../bull');

function handler(req, res) {
  const queues = Queues.list();

  res.render('dashboard/templates/queueList.hbs', { queues });
}

module.exports = handler;
