var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(process.env.GRAPHENEDB_URL);
var cypher = require('cypher-query');
var _ = require('underscore');

exports.findPersonWithSkills = function (skills, inferSkills, callback) {
  var query = null;
  if (inferSkills) {
    // TODO do something
  } else {
    query = cypher()
      .match("(p:Person)-[edge:KNOWS]->(s:Skill)")
      .where(pKnowsSkills(skills))
      .with("p.displayName AS name, p.id AS id, edge.level AS level, edge.affinity AS affinity, s.name AS skill")
      .return("name, id, level, affinity, skill");

    console.log(query.compile(true));
  }

  db.cypher({query: query.compile(true)}, function (err, result) {
    return callback(err, translatePerson(result));
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
    return callback(err, translatePerson(result));
  });
};

function translatePerson(neo4JPerson) {
  return {
    displayName: neo4JPerson[0].name,
    id: neo4JPerson[0].id,
    skills: _.map(neo4JPerson, function (personEntry) {
      return {
        name: personEntry.skill,
        // TODO This won't always be true
        inferred: false,
        level: personEntry.level,
        affinity: personEntry.affinity
      }
    })
  };
}