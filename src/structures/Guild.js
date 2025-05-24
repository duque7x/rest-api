const Routes = require("../rest/Routes");
const { Bet } = require("./Bet");
const { Collection } = require("./Collection");
const { Match } = require("./Match");
const { User } = require("./User");

const { BetsManager } = require("../managers/bets/BetsManager");
const { UsersManager } = require("../managers/users/UsersManager");
const { MatchesManager } = require("../managers/matches/MatchesManager");
const { BetUsersManager } = require("../managers/betusers/BetUsersManager");
const { BetUser } = require("./BetUser");

class Guild {
    #rest;
    #data;
    users;
    /**
     * 
     * @param {*} data 
     */
    constructor(data, rest) {
        console.log({
            guild: data
        });
        

        this.prefix = data?.prefix;
        this.id = data?.id;
        this.name = data?.name;
        this.state = data?.state;
        this.pricesOn = data?.pricesOn;
        this.pricesAvailable = data?.pricesAvailable;
        this.#data = data;
        this._id = data?._id;
        this.#rest = rest;
        this.seasonId = data?.seasonId;
        this.blacklist = data?.blacklist;

        this.users = new UsersManager(rest, this.id);
        this.betUsers = new BetUsersManager(rest, this.id);
        this.bets = new BetsManager(rest, this.id);
        this.matches = new MatchesManager(rest, this.id);

        this.#init();
    }

    #init() {
        const self = this;
        const id = self.id;
        console.log({ GUILDDDDid: self.id });
    
        for (let user of self.#data?.users ?? []) {
            self.users.set(
                user?.player?.id,
                new User(user, self.#rest, id)
            );
        }
    
        for (let user of self.#data?.betUsers ?? []) {
            self.betUsers.set(
                user?.player?.id,
                new BetUser(user, self.#rest, id)
            );
        }
    
        for (let bet of self.#data?.bets ?? []) {
            self.bets.set(bet?._id, new Bet(bet, self.#rest, id));
        }
    
        for (let match of self.#data?.matches ?? []) {
            self.matches.set(match?._id, new Match(match, self.#rest, id));
        }
    
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
        this.pricesOn = [...new Set(this.pricesOn ?? [])].sort((a, b) => a - b);
        this.pricesAvailable = [...new Set(this.pricesAvailable ?? [])].sort((a, b) => a - b);
    }
}

module.exports = { Guild };
