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