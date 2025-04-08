class BaseClass {
    #data;
    constructor(data) {
        this.#data = data;
    }

    toJSON = _ => this.#data;
}

module.exports = { BaseClass };