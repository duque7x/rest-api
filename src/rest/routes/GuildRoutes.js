const { Collection } = require("../../defaults/Collection");
const { Guild } = require("../../defaults/Guild");
const Routes = require("../../defaults/Routes");

module.exports = class GuildsRoutes {
    #guilds;
    #rest;

    constructor(rest) {
        this.#rest = rest;
        this.#guilds = new Collection();
    }

    async get(id) {        
        return new Guild(await this.#rest.request('GET', Routes.guild(id)), this.#rest);
    }

    async create(payload) {
        const guild = new Guild((await this.#rest.request('POST', Routes.guilds, payload)), this.#rest);

        this.#guilds.set(guild._id, guild)
        return guild;
    }
    get cache() {
        return this.#guilds;
    }

    async cacheGuilds() {
        const guilds = await this.#rest.request("GET", Routes.guilds);

        for (let guild of guilds) {
            this.#guilds.set(guild._id, guild);
        }
        return this.#guilds;
    }
}