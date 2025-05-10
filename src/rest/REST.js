// src/rest/index.js
const MatchesRoutes = require("./routes/MatchesRoutes");
const UsersRoutes = require("./routes/UsersRoutes");
const requester = require("./requester");
const Routes = require("../defaults/Routes");
const GuildsRoutes = require("./routes/GuildRoutes");

class REST {
  constructor(options) {
    this.token = options.token;

    // Inject baseURL/token into all route handlers
    this.matches = new MatchesRoutes(this);
    this.users = new UsersRoutes(this);
    this.guilds = new GuildsRoutes(this);
  }

  request(method, path, data) {
    return requester(method, Routes.base + path, this.token, data);
  }
}

module.exports = { REST };
