const { User } = require("./src/structures/User");
const { REST } = require("./src/rest/REST");
const UserManager = require("./src/managers/users/UsersManager");
const MatchesManager = require("./src/managers/matches/MatchesManager");
const GuildsManager = require("./src/managers/guilds/GuildsManager");
const EventEmitter = require("node:events");

class RestAPI extends EventEmitter {
  constructor(options = {}) {
    super({ captureRejections: true });
    
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
module.exports = { RestAPI, REST, User, MatchesManager, UserManager, GuildsManager, MatchTypes };
