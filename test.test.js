const { RestAPI } = require("./index.js");
const client = new RestAPI({
  token: "/mYcFkTs@hQll-a",
  baseURL: "http://localhost:3000/api/v1",
});

client.init().then(async (_) => {
  await console.log("User's routes initialized successfully");
  const user = client.users.cache.get("877598927149490186");
  //console.log(client.users.cache);

  user.increment("wins", 100).then(w => console.log(`Victory added! Now with ${w}`));
  user.increment("points", 13500).then(w => console.log(`Points added! Now with ${w}`));

  //client.users.deleteAll().then(m => console.log("User's routes initialized successfully"));
});

//setInterval(() => {}, 1 << 30); // ~12 days, never runs, keeps process alive
