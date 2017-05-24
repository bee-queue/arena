const auth = require('basic-auth');
const fs = require('fs');

const authConfig = JSON.parse(
  fs.readFileSync(__dirname + '/config/index.json', 'utf8')
).auth;

let middleware;
if (authConfig['type'] === 'http-basic') {
  middleware = (req, res, next) => {
    const user = auth(req);
    const admins = authConfig['admins'];
    if (!user || !admins[user.name] || admins[user.name].password !== user.pass) {
      res.set('WWW-Authenticate', 'Basic realm="bull-ui"');
      return res.status(401).send();
    }
    return next();
  };
} else {
  middleware = (req, res, next) => next();
}

module.exports = middleware;
