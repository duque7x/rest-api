const { Collection } = require("../../defaults/Collection");
const { Match } = require("../../defaults/Match");
const Routes = require("../../defaults/Routes");

module.exports = class MatchesRoutes {
    #matches;
    #rest;

    constructor(rest) {
        this.#rest = rest;
        this.#matches = new Collection();
    }

    async get(id) {
        return new Match(await this.#rest.request('GET', Routes.match(id)), this.#rest);
    }

    async create(payload) {
        const matchJson = await this.#rest.request('POST', Routes.matches, payload);
        return new Match(matchJson, this.#rest);
    }
    get cache() {
        return this.#matches;
    }
    async cacheMatches() {
        const TEN_MINUTES = 10 * 60 * 1000;

        const requestMatches = async () => {
            const matches = await this.#rest.request("GET", "/matches");
            if (!matches || matches.code === "ECONNREFUSED") return new Collection();

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