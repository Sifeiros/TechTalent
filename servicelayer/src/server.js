var express = require('express');
var bodyParser = require('body-parser');
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
var personModify = require('./person-modify');
var skillsSearch = require('./skills-search');

exports.createServer = function (port) {
  logger.info('Starting server on port', port);

  app.use(bodyParser.json());

  app.get('/', cors(), function (req, res) {
    res.status(501);
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({message: 'not implemented'}));
  });

  app.get('/persons', cors(), function (req, res) {
    var skills = req.query.skills;
    if (skills) {
      var splitSkills = req.query.skills.split(',');
      personSearch.findPeopleWithSkills(splitSkills, isTrue(req.query.infer), function (err, result) {
        res.status(200);
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
        logger.debug('Returning people with skills "%s" (infer? %s)', splitSkills, isTrue(req.query.infer));
      });
    } else {
      personSearch.allPersons(function (err, result) {
        res.status(200);
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
        logger.debug('Returning all persons');
      });
    }
  });

  app.post('/persons/:person', cors(), function (req, res) {
    console.log(req.body);
    personModify.modify(req.params.person, req.body, function(err, response) {
      if(err) {
        res.send(500);
        logger.error(err);
      } else {
        res.send(201);
      }
    });
  });

  app.get('/persons/:person', cors(), function (req, res) {
    res.set('Content-Type', 'application/json');
    var id = req.params.person;
    personSearch.findPerson(id, isTrue(req.query.infer), function (err, person) {
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
    res.set('Content-Type', 'application/json');
    skillsSearch.skills(function (err, skills) {
      res.status(200);
      res.send(JSON.stringify(skills));
      logger.debug('Returned skills %s', skills);
    });
  });

  app.get('/skills/stats', cors(), function (req, res) {
    res.set('Content-Type', 'application/json');
    skillsSearch.skillsWithStatistics(function (err, skills) {
      res.status(200);
      res.send(JSON.stringify(skills));
    })
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