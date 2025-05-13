const { RestAPI, Guild, BetTypes, MatchTypes } = require("./index.js");
const client = new RestAPI();
const chalk = require("chalk");

client.init().then(async (_) => {

  /*  await guild.add("prefix", "lol")
     .then(p => console.log(chalk.bgBlueBright(`Prefix setted to ${p}`))); */
  /* 
    await guild.add("state", { state: { matchesStatus: "on", rankStatus: "off" } })
      .then(states => console.log(chalk.bgBlack(`States setted to ${JSON.stringify(states)}`)));
   */
  //await guild.add("pricesAvailable", 2000);
  //await guild.add("pricesOn", 9000);
  //guild.set("seasonId", "1341399030282059776")
  /* const guild = await client.guilds.cache.get("1341399030282059776");
  console.log({ guild }); */


  /* const bet = await client.bets.create({
    type: BetTypes[3],
    adminId: "877598927149490186",
    creatorId: "877598927149490186",
    maximumSize: 6,
    price: 90
  });

  console.log({ bet });
 */
  //await client.bets.deleteAll();

  console.log({
    BetTypes,
    MatchTypes
  });
  
});
