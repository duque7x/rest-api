const Routes = require("./Routes");

class Guild {
    #rest;
    #data;
    constructor(data, rest) {
        this.prefix = data.prefix;
        this.id = data.id;
        this.name = data.name;
        this.#data = data;
        this._id = data._id;
        this.#rest = rest;
    }
    get data() {
        return this.#data;
    }

    async setPrefix(prefix) {
        console.log({ data: this.data });
        
        await this.#rest.request('PATCH', Routes.guild(this.id) + `/prefix`, { prefix })
        this.prefix = prefix;
        return prefix;
    }
}

module.exports = { Guild };