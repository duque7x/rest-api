const { RestAPI, Guild, BetTypes, MatchTypes } = require("./index.js");
const client = new RestAPI();
const chalk = require("chalk");

client.init().then(async (_) => {
  //const user = client.users.cache.at(0);
/* 
  const textChannel = await bet.add("channels", {
    id: "1232323",
    type: "waintingChannel"
  });

  console.log({ textChannel }); */

  //user.add("blacklisted", true);

  client.guilds.cache.forEach(console.log);
});
