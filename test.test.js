const { REST, Guild, BetTypes, MatchTypes } = require("./index.js");
const client = new REST();
const chalk = require("chalk");

client.init().then(async (_) => {
  const guild = client.guilds.cache.get("1341399030282059776");
  const users = guild.users;
  client.guilds
  console.log({
    users: users.cache
  });
  
});
