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
    }
    get data() {
        return this.#data;
    }
    async delete() {
        await this.#rest.request("DELETE", Routes.bet(this._id));
        return;

    };
    async add(field, amount) {
        this.#verifyField(field);
        const route = Routes.fields(Routes.bets, `${this._id}`, `${field.toLowerCase()}`);
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
        if (!value) throw new Error("where is the value?");

        if (key === "confirmed") {
            console.log({ key, value });

            if (typeof value !== "object") throw new Error("value must be a object");
            if (!value.type) throw new Error("where is the value.type?");
            if (!value.id) throw new Error("where is the value.id?");

            const updatedField = await this.#rest.request(
                "POST",
                Routes.fields(Routes.bets, `${this._id}`, `${key.toLowerCase()}`),
                { entry: { type: value.type, id: value.id } }
            );
            this[key] = updatedField;
            console.log({
                updatedField
            });
            
            return this;
        }
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
                { id, name }
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
                    "players", id),
            );

        console.log({ response });
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
