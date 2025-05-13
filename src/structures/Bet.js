const Routes = require("../rest/Routes");

class Bet {
    #rest;
    #data;
    /**
     * 
     * @param {*} data 
     */
    constructor(data, rest) {
        this.players = data.players;
        this.price = data.price;
        this.payedBy = data.payedBy;
        this.createdAt = data.createdAt;
        this.textChannel = data.textChannel;
        this.waintingChannel = data.waintingChannel;
        this.type = data.type;
        this.status = data.status;
        this.winners = data.winners;
        this.maximumSize = data.maximumSize;
        this.teamA = data.teamA;
        this.teamB = data.teamB;
        this.creatorId = data.creatorId;
        this.adminId = data.adminId;
        this._id = data._id;
        this.#rest = rest;
        this.#data = data;
    }
    get data() {
        return this.#data;
    }
    async delete() {
        await this.#rest.request("DELETE", Routes.bet(this._id));
        return;

    };
    async add(field, amount = 1) {
        this.#verifyField(field);
        const route = Routes.fields(Routes.bets, `${this._id}`, `${field.toLowerCase()}`);

        const updatedField = await this.#rest.request(
            "PATCH",
            route,
            { [field]: amount }
        );

        this[field] = updatedField;
        return this[field];
    };
    async remove(field, amount = 1) {
        this.#verifyField(field);

        const updatedField = await this.#rest.request(
            "PATCH",
            Routes.fields(Routes.bets, `${this._id}`, `${field.toLowerCase()}`),
            { [field]: -amount }
        );

        this[field] = updatedField;
        return this;
    };
    async set(key, value) {
        if (typeof key !== "string") throw new Error("key must be a string");
        this.#verifyField(key);

        const updatedField = await this.#rest.request(
            "PATCH",
            Routes.fields(Routes.bets, `${this._id}`, `${key.toLowerCase()}`),
            { set: value }
        );

        this[key] = updatedField;

        return this;
    };
    async addPlayer(option) {
        const { id, name } = option;
        if (!id) throw new Error("no id was provided");

        const response = await this.#rest
            .request("POST", Routes
                .fields(Routes.bet(this._id), "players"),
                { player: { id, name } }
            );
            console.log({ response });
            
        this.players = response;
        return response;
    }
    async removePlayer(option) {
        const { id, name } = option;
        if (!id) throw new Error("no id was provided")
        const response = await this.#rest
            .request("DELETE", Routes
                .fields(
                    Routes.bet(this._id),
                    "players"),
                { player: { id, name } }
            );

        this.players = response;
        return response;
    }
    #validFields = [
        "channels",
        "losers",
        "winners",
        "status",
        "players",
    ];
    #verifyField(field) {
        if (!this.#validFields.includes(field)) throw new Error(`Invalid field "${field}" for update`);
    }
}

module.exports = { Bet };
