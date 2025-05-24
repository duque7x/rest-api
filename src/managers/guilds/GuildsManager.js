const { Collection } = require("../../structures/Collection");
const { Guild } = require("../../structures/Guild");
const Routes = require("../../rest/Routes");

exports.GuildsManager = class GuildsManager {
    #guilds;
    #rest;
    /**
     * 
     */
    constructor(rest) {
        this.#rest = rest;
        this.#guilds = new Collection();
    }
    set(id, guild) {
        this.#guilds.set(id, guild);
        return;
    }
    async fetch(id) {
        if (!id || typeof id !== "string") throw new Error(`${id} must be an string or a Discord Snowflake`);

        const guild = new Guild(await this.#rest.request("GET", Routes.guilds.get(id)), this.#rest);
        this.#guilds.set(id, guild);

        return guild;
    };

    async create(payload) {
        const guild = new Guild((await this.#rest.request('POST', Routes.guilds.getAll(), payload)), this.#rest);

        this.#guilds.set(guild._id, guild);
        return guild;
    }
    get cache() {
        return this.#guilds;
    }

    async delete(id) {
        this.#verifyPayload("delete", id);
        await this.#rest.request("DELETE", Routes.guilds.get(id));

        this.#guilds.delete(id);
        return;
    };
    async deleteAll() {
        await this.#rest.request("DELETE", Routes.guilds.getAll());
        this.#guilds.clear();
        return;
    };

    #verifyPayload(type, payload) {
        if (type === "delete") {
            if (!payload || typeof payload !== "string") throw new Error(`payload must be guild's id not ${payload}`);
        }
        if (type === "create") {
            if (typeof payload !== "object") throw new Error(`${payload} is not an object`);
            if (!payload.id) throw new Error(`payload.id guild's id must be defined`);
        }
    }

    async cacheGuilds() {
        const TEN_MINUTES = 10 * 60 * 1000;

        const requestGuilds = async () => {
            const guilds = await this.#rest.request("GET", Routes.guilds.getAll());
            if (!guilds || guilds.error) return new Collection();

            for (const guild of guilds) {
                if (!guild.id) continue;
                this.#guilds.set(guild.id, new Guild(guild, this.#rest));
            }
        };
        await requestGuilds();
        setInterval(() => {
            requestGuilds().then(() => {
                console.log(`[CACHE] Refreshed active guilds`);
            }).catch(console.error); 
        }, TEN_MINUTES);
        return this.#guilds;
    }
}