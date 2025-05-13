const { Collection } = require("../../structures/Collection");
const { Match } = require("../../structures/Match");
const Routes = require("../../rest/Routes");

module.exports = class MatchesManager {
    #matches;
    #rest;

    constructor(rest) {
        this.#rest = rest;
        this.#matches = new Collection();
    }
    fetch = async (id) => {
        if (!id || typeof id !== "string") throw new Error(`${id} must be an string or a Discord Snowflake`);

        const match = new Match(await this.#rest.request("GET", Routes.match(id)), this.#rest);
        this.#matches.set(id, match);

        return match;
    };
    async create(payload) {
        const matchJson = await this.#rest.request('POST', Routes.matches, payload);
        return new Match(matchJson._id, this.#rest);
    }
    get cache() {
        return this.#matches;
    }
    async cacheMatches() {
        const TEN_MINUTES = 10 * 60 * 1000;

        const requestMatches = async () => {
            const matches = await this.#rest.request("GET", Routes.matches);
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