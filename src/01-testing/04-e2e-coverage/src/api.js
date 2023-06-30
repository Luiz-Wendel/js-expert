const http = require('http');

function handler(req, res) {
  return res.end('ok');
}

http.createServer(handler)
  .listen(3000, () => console.log('Server running on port 3000'));
