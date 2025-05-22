module.exports = {
    //base: "https://duque-bot-api.up.railway.app/api/v1",
    base: "http://localhost:3000/api/v1",
    
    field: field => `/${field}`,
    fields: (...field) => field.join("/"),

    guilds: {
        get: id => `/guilds/${id}`,
        getAll: `/guilds`,

        users: {
            getAll: guildId => `/guilds/${guildId}/users`,
            get: (userId, guildId) => `/guilds/${guildId}/users/${userId}`
        },
        matches: {
            getAll: guildId => `/guilds/${guildId}/matches`,
            get: (matchId, guildId) => `/guilds/${guildId}/matches/${matchId}`
        },
        bets: {
            getAll: guildId => `/guilds/${guildId}/bets`,
            get: (betId, guildId) => `/guilds/${guildId}/bets/${betId}`
        },
    }
}