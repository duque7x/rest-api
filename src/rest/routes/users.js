const { User } = require("../../defaults/User");

// src/rest/routes/users.js
module.exports = class UserRoutes {
    constructor(rest) {
        this.rest = rest;
    }

    async get(id) {
        if (!id || typeof id !== "string")
            throw new Error(`${id} must be an string or a Discord Snowflake`)

        return new User(await this.rest.request('GET', `/users/${id}`), this.rest)
    }
    async create(payload) {
        this.#verifyPayload("create", payload);
        
        return new User(await this.rest.request('POST', `/users`, payload), this.rest);
    }
    async deleteUser(id) {
        this.#verifyPayload("delete", id);

        await this.rest.request('delete', `/users/${id}`);
        return;
    }
    async deleteAll() {
        await this.rest.request('delete', `/users`);
        return;
    }
    #verifyPayload = (type, payload) => {
        if (type === "delete") {
            if (!payload || typeof payload !== "string") throw new Error(`payload must be user's id not ${payload}`);
        }
        if (type === "create") {
            if (typeof payload !== "object") throw new Error(`${payload} is not an object`);
            if (!payload.player.id) throw new Error(`${payload.id} user's id must be defined`);
        }
    }
    // More: updateUser, deleteUser, etc.
}
