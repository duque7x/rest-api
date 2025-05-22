const Routes = require("../rest/Routes");
const { Bet } = require("./Bet");
const { Collection } = require("./Collection");
const { Match } = require("./Match");
const { User } = require("./User");


class Guild {
    #rest;
    #data;
    users;

    constructor(data, rest) {
        this.prefix = data?.prefix;
        this.id = data?.id;
        this.name = data?.name;
        this.state = data?.state;
        this.pricesOn = data?.pricesOn;
        this.pricesAvailable = data?.pricesAvailable;
        this.#data = data;
        this._id = data?._id;
        this.#rest = rest;
        this.seasonId = data.seasonId;

        this.users = new Collection();
        this.betUsers = new Collection();
        this.bets = new Collection();
        this.matches = new Collection();

        this.#init(data);
        console.log({
            users: this.users,
            this: this
        });

    }
    #init(data) {
        for (let user of data.users) this.users.set(user.player.id, new User(user, this.#rest, this.id));
        for (let user of data.betUsers) this.betUsers.set(user.player.id, new User(user, this.#rest, this.id));
        for (let bet of data.bets) this.bets.set(bet._id, new Bet(bet, this.#rest, this.id));
        for (let match of data.matches) this.matches.set(match._id, new Match(match, this.#rest, this.id));

        this.#autoClean();
    }
    get data() {
        return this.#data;
    }
    async add(key, value) {
        const response = await this.#rest.request('PATCH', Routes.fields(Routes.guild(this.id), key), { [key]: value });
        this[key] = response;
        return value;
    }
    async remove(key, value) {
        const response = await this.#rest.request('DELETE', Routes.fields(Routes.guild(this.id), key), { [key]: value });
        this[key] = response;
        return value;
    }
    async set(key, value) {
        const response = await this.#rest.request('PATCH', Routes.fields(Routes.guild(this.id), key), { set: value });
        this[key] = response;
        return value;
    }
    #autoClean() {
        this.pricesOn = [...new Set(this.pricesOn)].sort((a, b) => a - b);
        this.pricesAvailable = [...new Set(this.pricesAvailable)].sort((a, b) => a - b);

    }
}

module.exports = { Guild };