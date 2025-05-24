const { REST, Guild, BetTypes, MatchTypes } = require("./index.js");
const client = new REST();

console.log({
  client: client.init
});

client.init().then(async (_) => {
  const guild = client.guilds.cache.get("1341399030282059776");
  const users = guild.betUsers;
  const user =await guild.betUsers.fetch("877598927149490186", "duque7x");

  console.log({
    user
  });
  
});


process.on('warning', (warning) => {
  console.warn(warning.name);    // e.g. 'Warning'
  console.warn(warning.message); // e.g. 'Accessing non-existent property...'
  console.warn(warning.stack);   // Full stack trace
});

