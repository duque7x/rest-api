const Routes = require("../rest/Routes");


class Match {
    #rest;
    #data;
    /**
     * 
     * @param {*} data 
     */
    constructor(data, rest) {
        this.type = data.type;
        this.voiceChannels = data.voiceChannels;
        this.status = data.status;
        this.creatorId = data.creatorId;
        this.players = data.players;
        this.kickedOut = data.kickedOut;
        this.teamA = data.teamA;
        this.teamB = data.teamB;
        this.confirmed = data.confirmed;
        this.leaders = data.leaders;
        this._id = data._id;
        this.#data = data;
        this.#rest = rest;
    }
    get data() {
        return this.#data;
    }
    async reset(key) {
        if (!key) {
            const options = {
                players: [],
                voiceChannels: [],
                kickedOut: [],
                teamA: [],
                teamB: [],
                confirmed: [],
                leaders: []
            };

            for (let op in options) {
                await this.#rest.request(
                    "delete",
                    Routes.fields(Routes.fields(Routes.match(this._id), op.toLowerCase()))
                );
                this[op] = options[op];
            }
            return this;
        }
        if (typeof key !== "string") throw new Error("key must be a string");

        const reset = await this.#rest.request(
            "delete",
            Routes.fields(Routes.fields(Routes.match(this._id), key.toLowerCase()))
        );
        this[key] = reset;

        return this;
    };
    async delete() {
        await this.#rest.request("delete", Routes.match(this._id));
        return;
    };
    async addPlayer(id, name) {
        if (!id) throw new Error("no id was provided")
        const response = await this.#rest.request("post", Routes.match(this._id), { id, name });

        this.players = response;
        return;
    }
}

module.exports = { Match };