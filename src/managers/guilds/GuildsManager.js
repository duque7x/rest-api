const { Collection } = require("../../structures/Collection");
const { Guild } = require("../../structures/Guild");
const Routes = require("../../rest/Routes");

module.exports = class GuildsManager {
    #guilds;
    #rest;
    constructor(rest) {
        this.#rest = rest;
        this.#guilds = new Collection();
    }

    async fetch(id) {
        if (!id || typeof id !== "string") throw new Error(`${id} must be an string or a Discord Snowflake`);

        const guild = new Guild(await this.#rest.request("GET", Routes.guild(id)), this.#rest);
        this.#guilds.set(id, guild);

        return guild;
    };

    async create(payload) {
        const guild = new Guild((await this.#rest.request('POST', Routes.guilds, payload)), this.#rest);

        this.#guilds.set(guild._id, guild);
        return guild;
    }
    get cache() {
        return this.#guilds;
    }

    async delete(id) {
        this.#verifyPayload("delete", id);
        await this.#rest.request("DELETE", Routes.guild(id));

        this.#guilds.delete(id);
        return;
    };
    async deleteAll() {
        await this.#rest.request("DELETE", Routes.guilds);
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
            const guilds = await this.#rest.request("GET", Routes.guilds);
            if (!guilds || guilds.error) return new Collection();

            for (const guild of guilds) {
                this.#guilds.set(guild.id, new Guild(guild, this.#rest));
            }
        };
        await requestGuilds();
        setInterval(() => {
            requestGuilds().then(() => {
                console.log(`[CACHE] Refreshed active guilds`);
            }).catch(console.error); // avoid unhandled rejections
        }, TEN_MINUTES);
        return this.#guilds;
    }
}