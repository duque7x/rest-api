const Routes = require("./Routes");

class User   {
  #rest;
  #data;
  /**
   * 
   * @param {*} data 
   */
  constructor(data, rest) {
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
          Routes.fields(`users`, `${this.player.id}`, `${op.toLowerCase()}`)
        );
        this[op] = options[op];
      }
      return this;
    }
    if (typeof key !== "string") throw new Error("key must be a string");
    this.#verifyField(key);

    const reset = await this.#rest.request(
      "delete",
      Routes.fields(`users`, `${this.player.id}`, `${key.toLowerCase()}`)
    );
    this[key] = reset;

    return this;
  };
  async delete() {
    await this.#rest.request("delete", Routes.user(this.player.id));
    return;

  };
  async increment(field, amount = 1) {
    this.#verifyField(field);
    const route = Routes.fields(`users`, `${this.player.id}`, `${field.toLowerCase()}`);

    const updatedUser = await this.#rest.request(
      "PATCH",
      route,
      { [field]: amount }
    );

    this[field] = updatedUser[field];

    return this[field];
  };
  async decrement(field, amount = 1) {
    this.#verifyField(field);

    const updatedUser = await this.#rest.request(
      "PATCH",
      Routes.fields(`users`, `${this.player.id}`, `${field.toLowerCase()}`),
      { [field]: -amount }
    );

    this[field] = updatedUser[field];
    return this;
  };
  async set(key, value) {
    if (typeof key !== "string") throw new Error("key must be a string");
    this.#verifyField(key);

    const updatedUser = await this.#rest.request(
      "PATCH",
      Routes.fields(`users`, `${this.player.id}`, `${key.toLowerCase()}`),
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
