const http = require('http');
const { once } = require('events');

// constants
const DEFAULT_USER = {
  username: 'Test',
  password: '123456',
};

const toLower = (text) => text.toLowerCase();

const routes = {
  'get:/contact': (_req, res) => {
    res.write('contact us page');

    return res.end();
  },
  // curl -i -X POST --data '{"username": "test", "password": "123456"}' localhost:3000/login
  'post:/login': async (req, res) => {
    const data = JSON.parse(await once(req, 'data'));

    if (!data.username || !data.password) {
      res.writeHead(400);

      return res.end('invalid data');
    }

    if (
      toLower(data.username) !== toLower(DEFAULT_USER.username)
      || data.password !== DEFAULT_USER.password
    ) {
      res.writeHead(401);

      return res.end('invalid credentials');
    }

    return res.end('ok');
  },
  default(_req, res) {
    res.writeHead(404);

    return res.end('page not found');
  },
};

function handler(req, res) {
  const { url, method } = req;

  const routeKey = `${method.toLowerCase()}:${url}`;

  const chosen = routes[routeKey] || routes.default;

  return chosen(req, res);
}

const app = http.createServer(handler)
  .listen(3000, () => console.log('Server running on port 3000'));

module.exports = app;
