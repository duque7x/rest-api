const { Collection } = require("../../structures/Collection");
const { Match } = require("../../structures/Match");
const Routes = require("../../rest/Routes");

exports.MatchesManager = class MatchesManager {
    #matches;
    #rest;

    constructor(rest, guildId) {
        this.#rest = rest;
        this.#matches = new Collection();
        this.guildId = guildId;
    }
    set(id, match) {
        this.#matches.set(id, match);
        return ;
      }
    fetch = async (id) => {
        if (!id || typeof id !== "string") throw new Error(`${id} must be an string or a Discord Snowflake`);

        const match = new Match(await this.#rest.request("GET", Routes.guilds.matches.get(id, this.guildId)), this.#rest);
        this.#matches.set(id, match);

        return match;
    };
    async create(payload) {
        const matchJson = await this.#rest.request('POST', Routes.guilds.matches.getAll(this.guildId), payload);
        return new Match(matchJson._id, this.#rest);
    }
    get cache() {
        return this.#matches;
    }
    async cacheMatches() {
        const TEN_MINUTES = 10 * 60 * 1000;

        const requestMatches = async () => {
            const matches = await this.#rest.request("GET", Routes.guilds.matches.getAll(this.guildId));
            if (!matches || matches.error) return new Collection();

            for (const match of matches) {
                this.#matches.set(match._id, new Match(match, this.#rest));
            }
        };
        await requestMatches();
        setInterval(() => {
            requestMatches().then(() => {
                console.log(`[CACHE] Refreshed active matches`);
            }).catch(console.error); // avoid unhandled rejections
        }, TEN_MINUTES);
        return this.#matches;
    }
}