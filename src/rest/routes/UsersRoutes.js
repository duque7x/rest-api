const { Collection } = require("../../defaults/Collection");
const { User } = require("../../defaults/User");

// src/rest/routes/users.js
module.exports = class UserRoutes {
  #rest;
  #users;
  constructor(rest) {
    this.#rest = rest;
    this.#users = new Collection();
  }

  fetch = async (id) => {
    if (!id || typeof id !== "string")
      throw new Error(`${id} must be an string or a Discord Snowflake`);

    const freshUser = new User(
      await this.#rest.request("GET", `/users/${id}`),
      this.#rest
    );

    this.#users.set(id, freshUser);

    return freshUser;
  };
  get cache() {
    return this.#users;
  }

  create = async (payload) => {
    this.#verifyPayload("create", payload);

    const user = new User(
      await this.#rest.request("POST", `/users`, payload),
      this.#rest
    );

    this.#users.set(user.id, user);
    return user;
  };
  delete = async (id) => {
    this.#verifyPayload("delete", id);

    await this.#rest.request("delete", `/users/${id}`);
    this.#users.delete(id);
    return;
  };
  deleteAll = async () => {
    await this.#rest.request("delete", `/users`);
    this.#users.clear();

    return;
  };
  #verifyPayload(type, payload) {
    if (type === "delete") {
      if (!payload || typeof payload !== "string")
        throw new Error(`payload must be user's id not ${payload}`);
    }
    if (type === "create") {
      if (typeof payload !== "object")
        throw new Error(`${payload} is not an object`);
      if (!payload.player.id)
        throw new Error(`payload.player.id user's id must be defined`);
    }
  }
  async cacheUsers() {
    const users = await this.#rest.request("GET", "/users");
    if (!users || users.length === 0) return [];

    for (const user of users) {
      const profile = new User(user, this.#rest);
      this.#users.set(user.player.id, profile);
    }
    return users;
  }
  async updateUser(id, payload) {
    if (!id || typeof id !== "string") throw new Error("Invalid user ID");
    if (typeof payload !== "object")
      throw new Error("Payload must be an object");

    return new User(
      await this.#rest.request("PATCH", `/users/${id}`, payload),
      this.#rest
    );
  }
};
