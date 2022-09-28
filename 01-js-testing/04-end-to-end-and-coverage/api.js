const http = require('http');

const handler = function (request, response) {
  return response.end('Hello World!');
}

const PORT = 3000;

const app = http.createServer(handler)
                .listen(PORT, () => console.log('app running at: ', PORT));

module.exports = app;
