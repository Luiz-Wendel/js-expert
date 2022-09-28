const http = require('http');

const handler = function (request, response) {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;

  console.log(routeKey);

  return response.end('Hello World!');
}

const PORT = 3000;

const app = http.createServer(handler)
                .listen(PORT, () => console.log('app running at: ', PORT));

module.exports = app;
