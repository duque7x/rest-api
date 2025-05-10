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

  get guilds() {
    return this.rest.guilds;
  }

  async init() {
    await this.users.cacheUsers();
    await this.matches.cacheMatches();
    await this.guilds.cacheGuilds();

    return this;
  }
}
const MatchTypes = {
  1: "1v1",
  2: "2v2",
  3: "3v3",
  4: "4v4",
  5: "5v5",
  6: "6v6",
}
module.exports = { RestAPI, REST, User, MatchesRoutes, UsersRoutes, MatchTypes };
