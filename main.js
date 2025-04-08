const a = require('./index.js');
const client = new a.RestAPI({ token: '/mYcFkTs@hQll-a', baseURL: "http://localhost:3000/api/v1" });

(async () => {
    const user = await client.users.create({
        player: { id: "877598927149490186" }
    });

    // client.users.deleteAll()
    //await client.users.deleteUser("877598927149490186");

    const userWins = await user.addWins();

    console.log(userWins);
    
})();