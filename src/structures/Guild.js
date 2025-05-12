const Routes = require("../rest/Routes");


class Guild {
    #rest;
    #data;
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