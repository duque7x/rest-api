const { REST, RestAPI, BaseClass, UsersRoutes, User } = require("./index.js");

const client = new RestAPI({
  token: "/mYcFkTs@hQll-a",
  baseURL: "http://localhost:3000/api/v1/",
});

client.users.init().then(async (_) => {
  console.log("User's routes initialized successfully");
  const users = client.users;
  const user = await client.users.create({ player: { id: "877598927149490186" } });
  //await user.increment("wins", 10)
  await user.set("blacklisted", true);

  user.increment("wins", 10).then(w => console.log(w));
  await user.set("blacklisted", false);

  console.log(user);
});