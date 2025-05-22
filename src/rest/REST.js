// src/rest/index.js
const MatchesManager = require("../managers/matches/MatchesManager");
const UsersManager = require("../managers/users/UsersManager");
const GuildsManager = require("../managers/guilds/GuildsManager");
const Routes = require("../rest/Routes");
const { request } = require('undici');
const BetsManager = require("../managers/bets/BetsManager");

class REST {
  constructor() {
    this.guilds = new GuildsManager(this);
  }

  async request(method, path, data) {
    return await this.requester(method, Routes.base + path, data);
  }

  async requester(method, url, data) {
    const headers = {
      Authorization: `Bearer /mYcFkTs@hQll-a`,
      'Content-Type': 'application/json',
    };

    const options = {
      method,
      headers,
      body: data !== undefined ? JSON.stringify(data) : undefined,
    };

    try {
      const res = await request(url, options);
      const responseData = await res.body.json();
      return responseData.data;
    } catch (error) {
      if (error instanceof Error) console.error('Error:', error.message);
      else console.error('Unexpected error occurred:', error);
      return { error: true, message: error.message || 'Unknown error' };
    }
  };
}
module.exports = { REST };
