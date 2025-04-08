const { REST, RestAPI, BaseClass, UsersRoutes, User } = require("./index.js");

/* const client = new RestAPI({
  token: "/mYcFkTs@hQll-a",
  baseURL: "http://localhost:3000/api/v1",
}); */

/* client.users.init().then(async (_) => {
  console.log("User's routes initialized successfully");

  const user = client.users.cache.get("877598927149490186");

  await user.decrement("gamesPlayed", "67f557274032ef88e1bda8ac");
  await user.increment("mvps", 2000000);

  console.log(user);
});
 */


console.log(User);
