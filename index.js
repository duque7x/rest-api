const { User } = require("./src/defaults/User");
const { REST } = require("./src/rest/REST");
const UsersRoutes = require("./src/rest/routes/UsersRoutes");
const { MatchesRoutes } = require("./src/rest/routes/MatchesRoutes");

class RestAPI {
  constructor(options = {}) {
    this.rest = new REST({
      baseURL: options.baseURL || "https://duque-bot-api.up.railway.app/api/v1",
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

  async init() {
    return await this.users.cacheUsers();
  }
}

module.exports = { RestAPI, REST, User, MatchesRoutes, UsersRoutes };
