const { User } = require("./src/structures/User");
const { REST } = require("./src/rest/REST");
const UserManager = require("./src/managers/users/UsersManager");
const MatchesManager = require("./src/managers/matches/MatchesManager");
const GuildsManager = require("./src/managers/guilds/GuildsManager");
const { Bet } = require("./src/structures/Bet");
const { Guild } = require("./src/structures/Guild");
const { Match } = require("./src/structures/Match");
const { BetUser } = require("./src/structures/BetUser");

const MATCHTYPES = {
  OneVOne: "1v1",
  TwoVTwo: "2v2",
  ThreeVThree: "3v3",
  FourVFour: "4v4",
  FiveVFive: "5v5",
  SixVSix: "6v6",
}
const BETTYPES = {
  OneVOne: "1v1",
  TwoVTwo: "2v2",
  ThreeVThree: "3v3",
  FourVFour: "4v4",
  FiveVFive: "5v5",
  SixVSix: "6v6",
}
const STATES = {
  ON: "on",
  OFF: "on",
  CREATED: "created",
  SHUTTED: "shutted",
  WAITING: "waiting",
}

exports.REST = REST;

exports.MatchesManager;
exports.UserManager = UserManager;
exports.GuildsManager = GuildsManager;
exports.MatchesManager = MatchesManager;

exports.Bet = Bet;
exports.Guild = Guild;
exports.Match = Match;
exports.User = User;
exports.BetUser = BetUser;

exports.STATES = STATES;
exports.MATCHTYPES = MATCHTYPES;
exports.BETTYPES = BETTYPES;
