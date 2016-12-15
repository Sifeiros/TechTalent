var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(process.env.GRAPHENEDB_URL);
var cypher = require('cypher-query');
var _ = require('underscore');

exports.skills = function (callback) {
  var query = cypher()
    .match("(skill:Skill)")
    .return("DISTINCT skill.name AS skill");

  db.cypher({query: query.compile(true)}, function(err, result) { return callback(err, getListOfSkills(result)); });
};

function getListOfSkills(dbresult) {
  return _.map(dbresult, function(result) { return result.skill });
}

exports.skillsWithStatistics = function (callback) {
  var query = cypher()
    .match("(p:Person)-[edge:KNOWS]->(s:Skill)")
    .with("s AS s, { id: p.id, level: edge.level, affinity: edge.affinity } as connections")
    .return("s.name AS skill, collect(connections) AS values");

  db.cypher({query: query.compile(true)}, function(err, result) { return callback(err, allNumbersAsNumbers(result)); });
};

function allNumbersAsNumbers(skillset) {
  return _.map(skillset, function(skillEntry) {
    return {
      skill: skillEntry.skill,
      values: _.map(skillEntry.values, function(value) {
        return {
          id: value.id,
          level: parseInt(value.level),
          affinity: parseInt(value.affinity)
        }
      })
    }
  })
}