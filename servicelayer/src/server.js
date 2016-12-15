var express = require('express');
var cors = require('cors');
var app = express();

var winston = require('winston');
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({level: 'info'}),
    new (winston.transports.File)({
      filename: 'server-debug.log',
      level: 'debug'
    })
  ]
});

var personSearch = require('./person-search');
var skillsSearch = require('./skills-search');

exports.createServer = function (port) {
  logger.info('Starting server on port', port);

  app.get('/', cors(), function (req, res) {
    res.status(501);
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({message: 'not implemented'}));
  });

  app.get('/persons', cors(), function (req, res) {
    var skills = req.query.skills.split(',');
    if (skills) {
      personSearch.findPeopleWithSkills(skills, isTrue(req.query.infer), function (err, result) {
        res.status(200);
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
        logger.debug('Returning people with skills "%s" (infer? %s)', skills, isTrue(req.query.infer));
      });
    } else {
      res.status(200);
      res.set('Content-Type', 'application/json');
      res.send(JSON.stringify(personSearch.allPersons));
      logger.debug('Returning all persons');
    }
  });

  app.get('/persons/:person', cors(), function (req, res) {
    res.set('Content-Type', 'application/json');
    var id = req.params.person;
    personSearch.findPerson(id, true, function (err, person) {
      if (person) {
        res.status(200);
        res.send(JSON.stringify(person));
        logger.debug('Returning person with id %s', id);
      } else {
        res.status(404);
        res.send(JSON.stringify({error: 'No person with id "' + id + '" found.'}));
        logger.debug('No person with id %s found', id);
      }
    });
  });

  app.get('/skills', cors(), function (req, res) {
    skillsSearch.skills(function (err, skills) {
      res.status(200);
      res.send(JSON.stringify(skills));
      logger.debug('Returned skills %s', skills);
    });
  });

  var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    logger.debug('Server running at http://%s:%s', host, port);
  });

  return server;
};

function isTrue(param) {
  return param || param === "true";
}