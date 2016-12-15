var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(process.env.GRAPHENEDB_URL);
var cypher = require('cypher-query');

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

var _ = require('underscore');

exports.findPersonWithSkills = function (skills, inferSkills, callback) {
  var query = null;
  if((skills === null) || (skills.length === 0)) {
    query = cypher()
      .match("(p:Person)-[edge:KNOWS]->(s:Skill)")
      .with("p.displayName AS name, p.id AS id, {level: edge.level, affinity: edge.affinity, skill: s.name} AS skills")
      .return("name, id, collect(skills) AS skills");
  } else if (inferSkills) {
    // TODO do something
  } else {
    query = cypher()
      .match("(p:Person)-[edge:KNOWS]->(s:Skill)")
      .where(pKnowsSkills(skills))
      .with("p.displayName AS name, p.id AS id, {level: edge.level, affinity: edge.affinity, skill: s.name} AS skills")
      .return("name, id, collect(skills) AS skills");
  }

  db.cypher({query: query.compile(true)}, function (err, result) {
    return callback(err, translatePeople(result));
  });
};

function pKnowsSkills(skills) {
  return _.map(skills, function (skill) {
    return "(p)-[:KNOWS]->(:Skill { name: \"" + skill + "\"})"
  }).join(" AND ");
}

exports.findPerson = function (id, inferSkills, callback) {
  var query = null;
  // TODO Add the option to infer skills
  // if (inferSkills) {
  //   query = cypher()
  //     .match("(p:Person {id: {id}})-[:KNOWS]->(s:Skill)", {id: id})
  //     .return("p.displayName AS name, p.id AS id, COLLECT(s.name) AS skill");
  // } else {
  query = cypher()
    .match("(p:Person {id: {id}})-[edge:KNOWS]->(s:Skill)", {id: id})
    .with("p.displayName AS name, p.id AS id, edge.level AS level, edge.affinity AS affinity, s.name AS skill")
    .return("name, id, level, affinity, skill");
  // }

  db.cypher({query: query.compile(true)}, function (err, result) {
    return callback(err, translateFirstPerson(result));
  });
};

function translatePeople(neo4JPeople) {
  return _.map(neo4JPeople, function(person) {
    return {
      displayName: person.name,
      id: person.id,
      skills: _.map(person.skills, function(skill) {
        return {
          name: skill.skill,
          inferred: false,
          level: skill.level,
          affinity: skill.affinity
        }
      })
    }
  });
}

function translateFirstPerson(neo4JPerson) {
  return translatePerson(neo4JPerson, 0);
}

exports.findPerson = function (id, inferSkills, callback) {
  var query = null;
  if (inferSkills) {
    logger.debug('Listing direct and inferred skills for id', id);
    query = cypher()
      .match("(p:Person {id: {id}})-[:KNOWS]->(skill:Skill), (p)-[*]->(inferredSkill:Skill)", {id: id})
      .where("NOT (p)-[:KNOWS]->(inferredSkill)")
      .with("p as p, collect(DISTINCT skill.name) as skills, collect(DISTINCT inferredSkill.name) as inferredSkills")
      .return("p.displayName AS name, p.id AS id, skills, inferredSkills");
  } else {
    logger.debug('Listing direct skills for id', id);
    query = cypher()
      .match("(p:Person {id: {id}})-[edge:KNOWS]->(s:Skill)", {id: id})
      .with("p.displayName AS name, p.id AS id, edge.level AS level, edge.affinity AS affinity, s.name AS skill")
      .return("name, id, level, affinity, skill");
  }

  //logger.debug('Query:', query.toString());

  db.cypher({query: query.compile(true)}, function (err, result) {
    return callback(err, translatePerson(result, inferSkills));
  });
};

function translatePerson(neo4JPerson, inferSkills) {
  logger.debug('Result: %s', JSON.stringify(neo4JPerson));
  logger.debug('Skills were inferred? %s', inferSkills);

  if (inferSkills) {
    return translatePersonWithInference(neo4JPerson);
  }
  return translatePersonWithoutInference(neo4JPerson);
}

function translatePersonWithInference(neo4JPerson) {
  logger.debug("name: %s", neo4JPerson.name);
  logger.debug("id: %s", neo4JPerson.id);
  logger.debug("skills:", JSON.stringify(neo4JPerson.skills));
  logger.debug("inferredSkills:", JSON.stringify(neo4JPerson.inferredSkills));
  return {
    displayName: neo4JPerson.name,
    id: neo4JPerson.id,
    skills: _.map(neo4JPerson.skills, function (skillEntry) {
      return {
        name: skillEntry.skill,
        inferred: false,
        level: skillEntry.level,
        affinity: skillEntry.affinity
      }
    })/*.concat(_.map(neo4JPerson.inferredSkills, function (skillEntry) {
      return {
        name: skillEntry.skill,
        inferred: true,
        level: null,
        affinity: null
      }
    }))*/
  };
}

function translatePersonWithoutInference(neo4JPerson) {
  return {
    displayName: neo4JPerson[0].name,
    id: neo4JPerson[0].id,
    skills: _.map(neo4JPerson, function (personEntry) {
      return {
        name: personEntry.skill,
        inferred: false,
        level: personEntry.level,
        affinity: personEntry.affinity
      }
    })
  };
}