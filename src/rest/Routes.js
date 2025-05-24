module.exports = {
    //base: "https://duque-bot-api.up.railway.app/api/v1",
    base: "http://localhost:3000/api/v1",

    field: field => `/${field}`,
    fields: (...field) => field.join("/"),

    guilds: {
        get: id => `/guilds/${id}`,
        getAll: () => `/guilds`,

        delete: id => `/guilds/${id}`,
        deleteAll: () => `/guilds`,
        resource: (resourceName, guildId) => `/guilds/${guildId}/${resourceName}`,

        users: {
            getAll: guildId => `/guilds/${guildId}/users`,
            get: (userId, guildId) => `/guilds/${guildId}/users/${userId}`,

            create: guildId => `/guilds/${guildId}/users`,
            delete: (userId, guildId) => `/guilds/${guildId}/users/${userId}`,

            deleteAll: guildId => `/guilds/${guildId}/users`,
            resource: (userId, resourceName, guildId) => `/guilds/${guildId}/users/${userId}/${resourceName}`,
        },
        betUsers: {
            getAll: guildId => `/guilds/${guildId}/betusers`,
            get: (userId, guildId) => `/guilds/${guildId}/betusers/${userId}`,

            create: guildId => `/guilds/${guildId}/betusers`,
            delete: (userId, guildId) => `/guilds/${guildId}/betusers/${userId}`,

            deleteAll: guildId => `/guilds/${guildId}/betusers`,
            resource: (userId, resourceName, guildId) => `/guilds/${guildId}/betusers/${userId}/${resourceName}`,
        },
        matches: {
            getAll: guildId => `/guilds/${guildId}/matches`,
            get: (matchId, guildId) => `/guilds/${guildId}/matches/${matchId}`,

            create: guildId => `/guilds/${guildId}/matches`,
            delete: (matchId, guildId) => `/guilds/${guildId}/matches/${matchId}`,
            deleteAll: guildId => `/guilds/${guildId}/matches`,

            resource: (matchId, resourceName, guildId) => `/guilds/${guildId}/matches/${matchId}/${resourceName}`,
        },
        bets: {
            getAll: guildId => `/guilds/${guildId}/bets`,
            get: (betId, guildId) => `/guilds/${guildId}/bets/${betId}`,

            create: guildId => `/guilds/${guildId}/bets`,
            delete: (betId, guildId) => `/guilds/${guildId}/bets/${betId}`,
            deleteAll: (guildId) => `/guilds/${guildId}/bets/${betId}`,

            resource: (betId, resourceName, guildId) => `/guilds/${guildId}/bets/${betId}/${resourceName}`,
        },
    }
}