const { REST } = require("../..");

exports.User = class {
    #rest;
    /**
     * 
     * @param {{}} data 
     * @param {REST} rest 
     */
    constructor(data, rest) {
        this.player = data.player;
        this.points = data.points;
        this.wins = data.wins;
        this.mvps = data.mvps;
        this.losses = data.losses;
        this.gamesPlayed = data.gamesPlayed;
        this.blacklisted = data.blacklisted;
        this.protections = data.protections;
        this.originalChannels = data.originalChannels;
        this.#rest = rest;
    }
    async addWins(quantity) {
        quantity = quantity ?? 1;
        const updatedUser = await this.#rest.request('patch', `/users/${this.player.id}/wins`, { wins: quantity });
        this.wins = updatedUser.wins;
        return this;
    }
    async removeWins(quantity) {
        quantity = -quantity ?? -1;
        const updatedUser = await this.#rest.request('patch', `/users/${this.player.id}/wins`, { wins: quantity });
        this.wins = updatedUser.wins;

        return this;
    }
    async resetWins() {
        await this.#rest.request('delete', `/users/${this.player.id}/wins`);
        return this;
    }
    async delete() {
        await this.#rest.request('delete', `/users/${this.player.id}`);

        return;
    }
}

