const { REST } = require('./src/rest/REST');

class RestAPI {
  constructor(options = {}) {
    this.rest = new REST({
      baseURL: options.baseURL || 'https://match.com/api/v1',
      token: options.token,
    });
  }

  // Convenience access to routes
  get matches() {
    return this.rest.matches;
  }

  get users() {
    return this.rest.users;
  }

  // ... add more shortcuts as you add more route groups
}

module.exports = { RestAPI, REST };
