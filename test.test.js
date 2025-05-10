const { RestAPI } = require("./index.js");
const client = new RestAPI({
  token: "/mYcFkTs@hQll-a",
  baseURL: "https://duque-bot-api.up.railway.app",
});
const chalk = require("chalk");

client.init().then(async (_) => {
  await console.log(chalk.bgBlue("User's routes initialized successfully"));
  const user = client.users.cache.get("877598927149490186");
  //console.log(client.users.cache);

  user.increment("wins", 100).then(w => console.log(chalk.bgYellowBright(`Victory added! Now with ${w}`)));
  user.increment("points", 13500).then(w => console.log(chalk.bgCyan(`Points added! Now with ${w}`)));

  //client.users.deleteAll().then(m => console.log("User's routes initialized successfully"));
});

//setInterval(() => {}, 1 << 30); // ~12 days, never runs, keeps process alive
