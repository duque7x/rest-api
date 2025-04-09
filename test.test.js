const { REST, RestAPI, BaseClass, UsersRoutes, User } = require("./index.js");

const client = new RestAPI({
  token: "/mYcFkTs@hQll-a",
  baseURL: "https://duque-bot-api.up.railway.app/api/v1",
});

client.users.init().then(async (_) => {
  console.log("User's routes initialized successfully");

  const user = client.users.cache.get("877598927149490186");
  //await user.increment("wins", 10)
  //await user.set("blacklisted", true);
  console.log(user);
  
});
