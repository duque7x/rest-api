const { RestAPI, MatchTypes } = require("./index.js");
const client = new RestAPI({
  token: "/mYcFkTs@hQll-a",
});
const chalk = require("chalk");

client.init().then(async (_) => {
  /* const guild = await client.guilds.create({
    id: "idd",
    name: "dq"
  });
  console.log({ guild }); */

  const guild = await client.guilds.get("idd");
  await guild.setPrefix("oi");

  console.log({ guild });

  const guild2 = await client.guilds.create({
    id: "1336809872884371587",
    name: "ranked zone"
  });
  await guild2.setPrefix("!");
  console.log({ guild2 });
});

//setInterval(() => {}, 1 << 30); // ~12 days, never runs, keeps process alive