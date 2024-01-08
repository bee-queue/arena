function handler(req, res) {
  const {Flows} = req.app.locals;
  const flows = Flows.list();
  const basePath = req.baseUrl;

  return res.render('dashboard/templates/flowList', {basePath, flows});
}

module.exports = handler;
