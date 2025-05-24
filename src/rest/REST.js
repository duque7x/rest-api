// src/rest/index.js
const { GuildsManager } = require("../managers/guilds/GuildsManager");
const Routes = require("../rest/Routes");
const { request } = require('undici');
const { EventEmitter } = require("node:events");

class REST extends EventEmitter {
  constructor(eventsClass) {
    super({ captureRejections: true });
    this.guilds = new GuildsManager(this, eventsClass);
  }
  async init() {
    await this.guilds.cacheGuilds();
  }
  async request(method, path, data) {
    return await this.#requester(method, Routes.base + path, data);
  }

  async #requester(method, url, data) {
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
      console.log({ options });
      const res = await request(url, options);
      const { data } = await res.body.json();

      console.log(`Response data`, { data });
      return data;
    } catch (error) {
      if (error instanceof Error) console.error('Error:', error.message);
      else console.error('Unexpected error occurred:', error);
      return { error: true, message: error.message || 'Unknown error' };
    }
  };
}
module.exports = { REST };
