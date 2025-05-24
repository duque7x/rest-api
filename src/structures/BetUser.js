const { REST } = require("../rest/REST");
const Routes = require("../rest/Routes");
const assert = require('node:assert');

exports.BetUser = class {
  #rest;
  #data;
  /**
   * 
   * @param {*} data 
   * @param {REST} rest
   */
  constructor(data, rest, guildId) {
    this.player = data.player;
    this.credit = data.credit;
    this.wins = data.wins;
    this.mvps = data.mvps;
    this.losses = data.losses;
    this.betsPlayed = data.betsPlayed;
    this.blacklisted = data.blacklisted;
    this.#rest = rest;
    this.#data = data;

    this.guildId = guildId;
  }
  get data() {
    return this.#data;
  }
  async reset(key) {
    if (!key) {
      const options = {
        wins: 0,
        credit: 0,
        losses: 0,
        mvps: 0,
        betsPlayed: [],
        blacklist: false,
      };

      for (let op in options) {
        const route = Routes.guilds.betUsers.resource(this.player.id, op, this.guildId);
        await this.#rest.request("DELETE", route);
        this[op] = options[op];
      }
      return this;
    }
    if (typeof key !== "string") throw new Error("key must be a string");

    this.#verifyField(key);
    const route = Routes.guilds.betUsers.resource(this.player.id, op, this.guildId);
    const reset = await this.#rest.request("DELETE", route);

    this[key] = reset;
    return this;
  };
  async delete() {
    const route = Routes.guilds.betUsers.delete(this.player.id, this.guildId);
    await this.#rest.request("DELETE", route);
    return;
  };
  async add(field, amount = 1) {
    this.#verifyField(field);
    const route = Routes.guilds.betUsers.resource(this.player.id, field, this.guildId);
    const updatedField = await this.#rest.request("PATCH", route, { [field]: amount });

    this[field] = updatedField;
    return this[field];
  };
  async remove(field, amount = 1) {
    this.#verifyField(field);
    const route = Routes.guilds.betUsers.resource(this.player.id, field, this.guildId);
    const updatedField = await this.#rest.request("PATCH", route, { [field]: -amount });

    this[field] = updatedField;
    return this;
  };
  async set(key, value) {
    if (typeof key !== "string") throw new Error("key must be a string");
    this.#verifyField(key);
    const route = Routes.guilds.betUsers.resource(this.player.id, key.toLowerCase(), this.guildId);
    const updatedField = await this.#rest.request("PATCH", route, { set: value });

    this[key] = updatedField;

    return this;
  };
  #validFields = [
    "wins",
    "credit",
    "losses",
    "mvps",
    "betsPlayed",
    "blacklisted",
  ];
  #verifyField(field) {
    if (!this.#validFields.includes(field)) throw new Error(`Invalid field "${field}" for update`);
  }
}
