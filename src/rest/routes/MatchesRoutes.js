module.exports = class MatchesRoutes {
    constructor(rest) {
        this.rest = rest;
    }

    async get(id) {
        return this.rest.request('GET', `/matches/${id}`);
    }

    async create(payload) {
        return this.rest.request('POST', `/matches`, payload);
    }
}

