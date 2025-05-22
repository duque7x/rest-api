const Routes = require("../rest/Routes");
const assert = require('node:assert');

class User {
  #rest;
  #data;
  #guildId;
  /**
   * 
   * @param {*} data 
   */
  constructor(data, rest, guildId) {
    this.player = data.player;
    this.points = data.points;
    this.wins = data.wins;
    this.mvps = data.mvps;
    this.losses = data.losses;
    this.gamesPlayed = data.gamesPlayed;
    this.blacklisted = data.blacklisted;
    this.protections = data.protections;
    this.originalChannels = data.originalChannels;
    this.#rest = rest;
    this.#data = data;
    this.#guildId = guildId;
  }
  get data() {
    return this.#data;
  }
  async reset(key) {
    if (!key) {
      const options = {
        wins: 0,
        points: 0,
        losses: 0,
        mvps: 0,
        gamesPlayed: [],
        protections: [],
        originalChannels: [],
        blacklist: { blacklisted: false },
      };

      for (let op in options) {
        await this.#rest.request(
          "delete",
          Routes.fields(Routes.users, `${this.player.id}`, `${op.toLowerCase()}`)
        );
        this[op] = options[op];
      }
      return this;
    }
    if (typeof key !== "string") throw new Error("key must be a string");
    this.#verifyField(key);

    const reset = await this.#rest.request(
      "delete",
      Routes.fields(Routes.users, `${this.player.id}`, `${key.toLowerCase()}`)
    );
    this[key] = reset;

    return this;
  };
  async delete() {
    await this.#rest.request("delete", Routes.user(this.player.id));
    return;

  };
  async add(field, amount = 1) {
    this.#verifyField(field);
    const route = Routes.fields(Routes.users, `${this.player.id}`, `${field.toLowerCase()}`);

    const updatedField = await this.#rest.request(
      "PATCH",
      route,
      { [field]: amount }
    );

    this[field] = updatedField;
    return this[field];
  };
  async remove(field, amount = 1) {
    this.#verifyField(field);

    const updatedField = await this.#rest.request(
      "PATCH",
      Routes.fields(Routes.users, `${this.player.id}`, `${field.toLowerCase()}`),
      { [field]: -amount }
    );

    this[field] = updatedField;
    return this;
  };
  async set(key, value) {
    if (typeof key !== "string") throw new Error("key must be a string");
    this.#verifyField(key);

    const updatedField = await this.#rest.request(
      "PATCH",
      Routes.fields(Routes.users, `${this.player.id}`, `${key.toLowerCase()}`),
      { set: value }
    );

    this[key] = updatedField;

    return this;
  };
  #validFields = [
    "wins",
    "points",
    "losses",
    "mvps",
    "gamesPlayed",
    "blacklisted",
  ];
  #verifyField(field) {
    if (!this.#validFields.includes(field)) throw new Error(`Invalid field "${field}" for update`);
  }
}

module.exports = { User };
