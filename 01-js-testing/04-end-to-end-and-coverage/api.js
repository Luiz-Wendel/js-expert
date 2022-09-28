const http = require('http');

const DEFAULT_USER = {
  username: 'SomeUser',
  password: 'somePassword',
};

const routes = {
  '/login:post': async (request, response) => {
    for await (const data of request) {
      const user = JSON.parse(data);

      if (
        user.username !== DEFAULT_USER.username
        || user.password !== DEFAULT_USER.password
      ) {
        response.writeHead(401);
        response.write('Login failed!');
        return response.end();
      }

      response.write('Login has succeeded!');
      return response.end();
    }
  },

  '/contact:get': (_request, response) => {
    response.write('contact us page');

    return response.end();
  },

  default: (_request, response) => {
    response.write('Hello World!');

    return response.end();
  }
}

const handler = function (request, response) {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;
  const chosenRoute = routes[routeKey] || routes.default;

  response.writeHead(200, {
    'Content-Type': 'text/html',
  });

  return chosenRoute(request, response);
}

const PORT = 3000;

const app = http.createServer(handler)
                .listen(PORT, () => console.log('app running at: ', PORT));

module.exports = app;
