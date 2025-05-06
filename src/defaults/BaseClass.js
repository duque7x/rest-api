class BaseClass {
    #data;
    constructor(data) {
        this.#data = data;
    }
    toJSON() {
        return this.#data;
    }
}

module.exports = { BaseClass };