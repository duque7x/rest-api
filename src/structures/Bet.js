const Routes = require("../rest/Routes");

class Bet {
    #rest;
    #data;
    /**
     * 
     * @param {*} data 
     */
    constructor(data, rest, guildId) {
        this.players = data.players;
        this.price = data.price;
        this.payedBy = data.payedBy;
        this.createdAt = data.createdAt;

        this.channels = {
            textChannel: data.textChannel,
            waintingChannel: data.waintingChannel,
        }
        this.type = data.type;
        this.status = data.status;
        this.winners = data.winners;
        this.maximumSize = data.maximumSize;
        this.teamA = data.teamA;
        this.teamB = data.teamB;
        this.creatorId = data.creatorId;
        this.adminId = data.adminId;
        this.confirmed = data.confirmed;
        this._id = data._id;
        this.#rest = rest;
        this.#data = data;

        this.guildId = guildId;
    }
    get data() {
        return this.#data;
    }
    async delete() {
        await this.#rest.request("DELETE", Routes.guilds.bets.delete(this._id, this.guildId));
        return;
    };
    async add(field, amount) {
        this.#verifyField(field);
        const route = Routes.guilds.bets.resource(this._id, field.toLowerCase(), this.guildId);
        if (field === "channels") {
            console.log({ field, amount });
            const updatedField = await this.#rest.request(
                "PATCH",
                route,
                { channel: amount }
            );
            this[amount.type] = { id: updatedField.id };

            return updatedField;
        }
        const updatedField = await this.#rest.request(
            "PATCH",
            route,
            { [field]: amount }
        );

        this[field] = updatedField;
        return this[field];
    };
    async remove(field, amount) {
        this.#verifyField(field);
        const route = Routes.guilds.bets.resource(this._id, field.toLowerCase(), this.guildId);
        const updatedField = await this.#rest.request(
            "PATCH",
            route,
            { [field]: -amount }
        );

        this[field] = updatedField;
        return this;
    };
    async set(key, value) {
        if (typeof key !== "string") throw new Error("key must be a string");
        if (!value) throw new Error("where is the value?");
        const route = Routes.guilds.bets.resource(this._id, key.toLowerCase(), this.guildId);
        if (key === "confirmed") {
            if (typeof value !== "object") throw new Error("value must be a object");
            if (!value.type) throw new Error("where is the value.type?");
            if (!value.id) throw new Error("where is the value.id?");

            const updatedField = await this.#rest.request(
                "POST",
                route,
                { entry: { type: value.type, id: value.id } }
            );
            this.confirmed = updatedField;
            console.log({
                updatedField
            });

            return this;
        }
        this.#verifyField(key);
        const updatedField = await this.#rest.request(
            "PATCH",
            route,
            { set: value }
        );

        this[key] = updatedField;

        return this;
    };
    async addPlayer(option) {
        const { id, name } = option;
        if (!id) throw new Error("no id was provided");
        const route = Routes.guilds.bets.resource(this._id, "players", this.guildId);
        const response = await this.#rest
            .request("POST",
                route,
                { id, name }
            );
        console.log({ response });

        this.players = response;
        return response;
    }
    async removePlayer(option) {
        const { id, name } = option;
        if (!id) throw new Error("no id was provided")

        const route = Routes.guilds.bets.resource(this._id, "players", this.guildId);
        const response = await this.#rest  .request("DELETE", route);

        this.players = response;
        return response;
    }
    #validFields = [
        "channels",
        "losers",
        "winners",
        "status",
        "players",
        "confirmed"
    ];
    #verifyField(field) {
        if (!this.#validFields.includes(field)) throw new Error(`Invalid field "${field}" for update`);
    }
}
module.exports = { Bet };
