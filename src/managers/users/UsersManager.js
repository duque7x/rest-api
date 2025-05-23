const { Collection } = require("../../structures/Collection");
const { User } = require("../../structures/User");
const Routes = require("../../rest/Routes");

class UsersManager {
  #rest;
  #users;
  constructor(rest, guildId) {
    this.#rest = rest;
    this.#users = new Collection();
    this.guildId = guildId;
  }

  set(id, user) {
    this.#users.set(id, user);
    return;
  }

  fetch = async (id) => {
    if (!id || typeof id !== "string") throw new Error(`${id} must be an string or a Discord Snowflake`);

    const user = new User(
      await this.#rest.request("GET", Routes.guilds.users.get(id, this.guildId)),
      this.#rest
    );
    if (!this.#users.has(id)) this.#users.set(id, user);
    return user;
  };

  get cache() {
    return this.#users;
  }
  create = async (payload) => {
    this.#verifyPayload("create", payload);

    const user = new User(
      await this.#rest.request("POST", Routes.guilds.users.create(this.guildId), payload),
      this.#rest
    );

    this.#users.set(user.id, user);
    return user;
  };
  delete = async (id) => {
    this.#verifyPayload("DELETE", id);
    await this.#rest.request("DELETE", Routes.guilds.users.get(id, this.guildId), {
      guildId: this.guildId
    });
    this.#users.delete(id);
    return;
  };
  deleteAll = async () => {
    await this.#rest.request("DELETE", Routes.guilds.users.deleteAll(this.guildId));
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
      if (!payload.id)
        throw new Error(`payload.id user's id must be defined`);
    }
  }
  async cacheUsers() {
    const TEN_MINUTES = 10 * 60 * 1000;

    const requestUsers = async () => {
      const users = await this.#rest.request("GET", Routes.guilds.users.getAll(this.guildId));

      if (!users || users.error) return new Collection();
      for (const user of users) {
        this.#users.set(user.player.id, new User(user, this.#rest));
      }
    };
    await requestUsers();

    setInterval(() => {
      requestUsers().then(() => {
        console.log(`[CACHE] Refreshed active users`);
      }).catch(console.error); // avoid unhandled rejections
    }, TEN_MINUTES);
    return this.#users;
  }

  async update(id, payload) {
    if (!id || typeof id !== "string") throw new Error("Invalid user ID");
    if (typeof payload !== "object") throw new Error("Payload must be an object");

    return new User(
      await this.#rest.request("PATCH", Routes.guilds.users.get(id, this.guildId), payload),
      this.#rest
    );
  }
};
exports.UsersManager = UsersManager;