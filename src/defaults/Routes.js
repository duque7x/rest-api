module.exports = {
    base: "https://duque-bot-api.up.railway.app/api/v1",
    //base: "http://localhost:3000/api/v1",
    users: "/users",
    matches: "/matches",
    guilds: "/guilds",
    
    user: id => `/users/${id}`,
    match: id => `/matches/${id}`,
    guild: id => `/guilds/${id}`,
    field: (field) => `/${field}`,
    fields: (...field) => `/${field.join("/")}`,
}