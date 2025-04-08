// src/rest/index.js
const MatchesRoutes = require('./routes/matches');
const UsersRoutes = require('./routes/users');
const requester = require('./requester');

class REST {
  constructor(options) {
    this.baseURL = options.baseURL;
    this.token = options.token;

    // Inject baseURL/token into all route handlers
    this.matches = new MatchesRoutes(this);
    this.users = new UsersRoutes(this);
  }

  request(method, path, data) {
    return requester(method, this.baseURL + path, this.token, data);
  }
}

module.exports = { REST };
