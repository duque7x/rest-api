const { REST } = require("../..");
const { BaseClass } = require("./BaseClass");

class User extends BaseClass {
  #rest;
  #data;
  constructor(data, rest) {
    super(data);

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
          `/users/${this.player.id}/${op.toLowerCase()}`
        );
        this[op] = options[op];
      }
      return this;
    }
    if (typeof key !== "string") throw new Error("key must be a string");
    this.#verifyField(key);

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
    
    return this[field];
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
  set = async (key, value) => {
    if (typeof key !== "string") throw new Error("key must be a string");
    this.#verifyField(key);

    const updatedUser = await this.#rest.request(
      "PATCH",
      `/users/${this.player.id}/${key.toLowerCase()}`,
      { set: value }
    );

    this[key] = updatedUser[key];

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
