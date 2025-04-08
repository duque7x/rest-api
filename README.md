# Rest

Rest is npm package made for a match based bot

## Installation

```bash
npm install @duque7x/rest
```

## Usage

```javascript
const { REST, RestAPI } = require("@duque7x/rest");
const client = new mod.RestAPI({
  token: "/mYcFkTs@hQll-a",
  baseURL: "http://localhost:3000/api/v1",
});

const users = async () => {
  const user = await client.users.create({
    player: { id: "877598927149490186" },
  });
  const userWins = await user.addWins();
  console.log(userWins);
};
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
