var http = require('http');
var logger = require('winston');

// Pretty much copied from https://blog.nodejitsu.com/a-simple-webservice-in-nodejs/
exports.createServer = function (port) {
  var server = http.createServer(function(request, response) {
    var data = '';

    logger.info('Incoming Request', { url: request.url });

    request.on('data', function (chunk) {
      data += chunk;
    });

    response.writeHead(501, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'not implemented'}));
  });

  if (port) {
    server.listen(port);
  }

  return server;
};