function handler(req, res) {
  const {Flows, rootPath} = req.app.locals;
  const flows = Flows.list();
  const basePath = rootPath ? `${rootPath}${req.baseUrl}` : req.baseUrl;

  return res.render('dashboard/templates/flowList', {basePath, flows});
}

module.exports = handler;
