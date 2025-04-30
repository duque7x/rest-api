// src/rest/index.js
const MatchesRoutes = require("./routes/MatchesRoutes");
const UsersRoutes = require("./routes/UsersRoutes");
const requester = require("./requester");

class REST {
  constructor(options) {
    this.baseURL = options.baseURL;
    this.token = options.token;

    // Inject baseURL/token into all route handlers
    this.matches = new MatchesRoutes(this);
    this.users = new UsersRoutes(this);
    this.users
  }

  request(method, path, data) {
    return requester(method, this.baseURL + path, this.token, data);
  }
}

module.exports = { REST };
