const { RestAPI } = require("./index.js");
const client = new RestAPI();
const chalk = require("chalk");

client.init().then(async (_) => {
  const guild = await client.guilds.get("1341399030282059776");
  await guild.set("prefix", "oi");

  console.log({ data: guild.data });
});
