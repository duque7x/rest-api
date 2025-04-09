const { BaseClass } = require("./src/defaults/BaseClass");
const { User } = require("./src/defaults/User");
const { REST } = require("./src/rest/REST");
const UsersRoutes = require("./src/rest/routes/UsersRoutes");
const { MatchesRoutes } = require("./src/rest/routes/MatchesRoutes");

class RestAPI {
  constructor(options = {}) {
    this.rest = new REST({
      baseURL: options.baseURL || "https://match.com/api/v1",
      token: options.token,
    });
  }

  // Convenience access to routes
  get matches() {
    return this.rest.matches;
  }

  get users() {
    return this.rest.users;
  }

  // ... add more shortcuts as you add more route groups
}

module.exports = { RestAPI, REST, User, MatchesRoutes, UsersRoutes, BaseClass };
