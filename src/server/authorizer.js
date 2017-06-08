function authorizer(app) {
  return function(username, password) {
    const {users} = app.get('bull config');
    return users && users[username] && users[username] === password;
  }
}

module.exports = authorizer;