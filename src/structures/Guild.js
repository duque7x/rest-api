const Routes = require("../rest/Routes");
const { Bet } = require("./Bet");
const { Collection } = require("./Collection");
const { Match } = require("./Match");
const { User } = require("./User");

const { BetsManager } = require("../managers/bets/BetsManager");
const { UsersManager } = require("../managers/users/UsersManager");
const { MatchesManager } = require("../managers/matches/MatchesManager");
const { BetUsersManager } = require("../managers/betusers/BetUsersManager");
const { REST } = require("../rest/REST");

class Guild {
    #rest;
    #data;
    users;
    /**
     * 
     * @param {*} data 
     * @param {REST} rest 
     */
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
        this.blacklist = data.blacklist;

        this.users = new UsersManager(rest, this.id);
        this.betUsers = new BetUsersManager(rest, this.id);
        this.bets = new BetsManager(rest, this.id);
        this.matches = new MatchesManager(rest, this.id);

        this.#init();
    }
    #init() {
        for (let user of this.#data.users) this.users.set(user?.player?.id, new User(user, this.#rest, this.id));
        for (let user of this.#data.betUsers) this.betUsers.set(user?.player?.id, new User(user, this.#rest, this.id));
        for (let bet of this.#data.bets) this.bets.set(bet._id, new Bet(bet, this.#rest, this.id));
        for (let match of this.#data.matches) this.matches.set(match._id, new Match(match, this.#rest, this.id));

        this.#autoClean();
    }
    get data() {
        return this.#data;
    }
    async add(key, value) {
        const route = Routes.guilds.resource(key, this.id);
        const response = await this.#rest.request('PATCH', route, { [key]: value });
        this[key] = response;
        this.#rest.emit("guildUpdate", response);
        return value;
    }
    async remove(key, value) {
        const route = Routes.guilds.resource(key, this.id);
        const response = await this.#rest.request('DELETE', route, { [key]: value });
        this[key] = response;
        return value;
    }
    async set(key, value) {
        const route = Routes.guilds.resource(key, this.id);
        const response = await this.#rest.request('PATCH', route, { set: value });
        this[key] = response;
        return value;
    }
    #autoClean() {
        this.pricesOn = [...new Set(this.pricesOn)].sort((a, b) => a - b);
        this.pricesAvailable = [...new Set(this.pricesAvailable)].sort((a, b) => a - b);
    }
}

module.exports = { Guild };