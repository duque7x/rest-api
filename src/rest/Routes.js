module.exports = {
    //base: "https://duque-bot-api.up.railway.app/api/v1",
    base: "http://localhost:3000/api/v1",

    users: "/users",
    betUsers: "/betusers",
    matches: "/matches",
    guilds: "/guilds",
    bets: "/bets",
    
    user: id => `/users/${id}`,
    match: id => `/matches/${id}`,
    bet: id => `/bets/${id}`,
    guild: id => `/guilds/${id}`,

    field: (field) => `/${field}`,
    fields: (...field) => `${field.join("/")}`,
}