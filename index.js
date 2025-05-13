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

  get bets() {
    return this.rest.bets;
  }
  async init() {
    await this.users.cacheUsers();
    await this.matches.cacheMatches();
    await this.guilds.cacheGuilds();
    await this.bets.cacheBets();

    return this;
  }
}
const MatchTypes = {
  OneVOne: "1v1",
  TwoVTwo: "2v2",
  ThreeVThree: "3v3",
  FourVFour: "4v4",
  FiveVFive: "5v5",
  SixVSix: "6v6",
}
const BetTypes = {
  OneVOne: "1v1",
  TwoVTwo: "2v2",
  ThreeVThree: "3v3",
  FourVFour: "4v4",
  FiveVFive: "5v5",
  SixVSix: "6v6",
}
module.exports = { RestAPI, REST, User, MatchesManager, UserManager, GuildsManager, MatchTypes, BetTypes };
