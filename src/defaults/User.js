const { REST } = require("../..");
const { BaseClass } = require("./BaseClass");

class User extends BaseClass {
  #rest;
  #data;
  constructor(data, rest) {
    super(data, this);

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
  }
  get data() {
    return this.#data;
  }
  reset = async (key) => {
    if (typeof key !== "string") throw new Error("key must be a string");

    if (!this.hasOwnProperty(key)) throw new Error(`${key} is not available`);

    const reset = await this.#rest.request(
      "delete",
      `/users/${this.player.id}/${key}`
    );
    this[key] = reset;

    return this;
  };
  delete = async () => {
    await this.#rest.request("delete", `/users/${this.player.id}`);
    return;
  };
  increment = async (field, amount = 1) => {
    this.#verifyField(field);

    const updatedUser = await this.#rest.request(
      "PATCH",
      `/users/${this.player.id}/${field.toLowerCase()}`,
      { [field]: amount }
    );

    this[field] = updatedUser[field];
    return this;
  };

  decrement = async (field, amount = 1) => {
    this.#verifyField(field);

    const updatedUser = await this.#rest.request(
      "PATCH",
      `/users/${this.player.id}/${field.toLowerCase()}`,
      { [field]: -amount }
    );

    this[field] = updatedUser[field];
    return this;
  };
  #validFields = ["wins", "points", "losses", "mvps", "gamesPlayed"];

  #verifyField(field) {
    if (!this.#validFields.includes(field))
      throw new Error(`Invalid field "${field}" for update`);
  }
}

module.exports = { User };
