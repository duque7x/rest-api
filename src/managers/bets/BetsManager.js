const { Collection } = require("../../structures/Collection");
const { Bet } = require("../../structures/Bet");
const Routes = require("../../rest/Routes");

exports.BetsManager = class BetsManager {
    #bets;
    #rest;
    constructor(rest, guildId) {
        this.#rest = rest;
        this.#bets = new Collection();
        this.guildId = guildId;
    }
    set(id, bet) {
        this.#bets.set(id, bet);
        return bet;
    }
    fetch = async (id) => {
        if (!id || typeof id !== "string") throw new Error(`${id} must be an string or a Discord Snowflake`);

        const bet = new Bet(
            await this.#rest.request("GET", Routes.guilds.bets(id, this.guildId)),
            this.#rest
        );
        this.#bets.set(id, bet);
        return bet;
    };

    async create(payload) {
        const bet = new Bet((await this.#rest.request('POST', Routes.guilds.bets.getAll(this.guildId), payload)), this.#rest);
        this.#bets.set(bet._id, bet);
        return bet;
    }
    get cache() {
        return this.#bets;
    }

    delete = async (id) => {
        await this.#rest.request("DELETE", Routes.guilds.bets.delete(id, this.guildId));
        this.#bets.delete(id);
        return;
    };

    deleteAll = async () => {
        await this.#rest.request("DELETE", Routes.guilds.bets.deleteAll(this.guildId));
        this.#bets.clear();
        return;
    };
}