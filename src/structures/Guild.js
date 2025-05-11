const Routes = require("../rest/Routes");


class Guild {
    #rest;
    #data;
    constructor(data, rest) {
        this.prefix = data?.prefix;
        this.id = data?.id;
        this.name = data?.name;
        this.state = data.state;
        this.prices = data.prices;
        this.#data = data;
        this._id = data?._id;
        this.#rest = rest;
    }
    get data() {
        return this.#data;
    }
    async set(key, value) {
        await this.#rest.request('PATCH', Routes.fields(Routes.guild(this.id), key), { [key]: value });

        this[key] = value;
        return value;
    }
}

module.exports = { Guild };