const http = require('http');

const routes = {
  'get:/contact': (_req, res) => {
    res.write('contact us page');

    return res.end();
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

http.createServer(handler)
  .listen(3000, () => console.log('Server running on port 3000'));
