var express = require('express');
var app = express();
var winston = require('winston');
var logger = new (winston.Logger) ({
  transports: [
    new (winston.transports.Console) ({ level: 'info' }),
    new (winston.transports.File) ({
      filename: 'server-debug.log',
      level: 'debug'
    })
  ]
});

var persons = require('./person-mocks');

exports.createServer = function (port) {
  app.get('/', function(req, res) {
    res.status(501);
    res.send(JSON.stringify({ message: 'not implemented'}));
  });

  app.get('/persons', function(req, res) {
    res.status(200);
    res.send(JSON.stringify(persons));
  });

  var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;

    logger.debug('Server running at http://%s:%s', host, port);
  });

  return server;
};