const { Collection } = require("../../structures/Collection");
const { BetUser } = require("../../structures/BetUser");
const Routes = require("../../rest/Routes");

class BetUsersManager {
  #rest;
  #betUsers;
  constructor(rest, guildId) {
    this.#rest = rest;
    this.#betUsers = new Collection();
    this.guildId = guildId;
  }

  set(id, user) {
    this.#betUsers.set(id, user);
    return;
  }

  fetch = async (id) => {
    if (!id || typeof id !== "string") throw new Error(`${id} must be an string or a Discord Snowflake`);

    const user = new BetUser(await this.#rest.request("GET", Routes.guilds.betUsers.get(id)), this.#rest)
    this.#betUsers.set(id, user);
    return user;
  };

  get cache() {
    return this.#betUsers;
  }
  create = async (payload) => {
    this.#verifyPayload("create", payload);

    const user = new BetUser(
      await this.#rest.request("POST", Routes.guilds.betUsers.getAll(this.guildId), payload),
      this.#rest
    );

    this.#betUsers.set(user.id, user);
    return user;
  };
  delete = async (id) => {
    this.#verifyPayload("DELETE", id);

    await this.#rest.request("DELETE", Routes.guilds.betUsers.delete(id, this.guildId));
    this.#betUsers.delete(id);
    return;
  };
  deleteAll = async () => {
    await this.#rest.request("DELETE", Routes.guilds.betUsers.deleteAll(this.guildId));
    this.#betUsers.clear();

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
      const betUsers = await this.#rest.request("GET", Routes.guilds.betUsers.getAll(this.guildId));

      if (!betUsers || betUsers.error) return new Collection();
      for (const user of betUsers) {
        this.#betUsers.set(user.player.id, new BetUser(user, this.#rest));
      }
    };
    await requestUsers();

    setInterval(() => {
      requestUsers().then(() => {
        console.log(`[CACHE] Refreshed active betUsers`);
      }).catch(console.error); // avoid unhandled rejections
    }, TEN_MINUTES);
    return this.#betUsers;
  }

  async update(id, payload) {
    if (!id || typeof id !== "string") throw new Error("Invalid user ID");
    if (typeof payload !== "object") throw new Error("Payload must be an object");

    return new BetUser(
      await this.#rest.request("PATCH", Routes.guilds.betUsers(id, this.guildId), payload),
      this.#rest
    );
  }
};

exports.BetUsersManager = BetUsersManager;