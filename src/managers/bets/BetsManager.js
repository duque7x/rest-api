const { Collection } = require("../../structures/Collection");
const { Bet } = require("../../structures/Bet");
const Routes = require("../../rest/Routes");

module.exports = class BetsManager {
    #bets;
    #rest;
    constructor(rest) {
        this.#rest = rest;
        this.#bets = new Collection();
    }

    fetch = async (id) => {
        if (!id || typeof id !== "string") throw new Error(`${id} must be an string or a Discord Snowflake`);

        const bet = new Bet(await this.#rest.request("GET", Routes.bet(id)), this.#rest);
        this.#bets.set(id, bet);
        return bet;
    };

    async create(payload) {
        const bet = new Bet((await this.#rest.request('POST', Routes.bets, payload)), this.#rest);
        this.#bets.set(bet._id, bet);
        return bet;
    }
    get cache() {
        return this.#bets;
    }

    delete = async (id) => {
        await this.#rest.request("DELETE", Routes.bet(id));
        this.#bets.delete(id);
        return;
    };

    deleteAll = async () => {
        await this.#rest.request("DELETE", Routes.bets);
        this.#bets.clear();
        return;
    };

    async cacheBets() {
        const TEN_MINUTES = 10 * 60 * 1000;

        const requestGuilds = async () => {
            const bets = await this.#rest.request("GET", Routes.bets);
            if (!bets || bets.error) return new Collection();

            for (const bet of bets) {
                this.#bets.set(bet._id, new Bet(bet, this.#rest));
            }
        };
        await requestGuilds();

        setInterval(() => {
            requestGuilds().then(() => {
                console.log(`[CACHE] Refreshed active bets`);
            }).catch(console.error);
        }, TEN_MINUTES);
        return this.#bets;
    }
}