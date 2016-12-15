var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(process.env.GRAPHENEDB_URL);
var cypher = require('cypher-query');

var _ = require('underscore');

exports.modify = function(id, skill, callback) {
  var query = cypher()
    .match("(p:Person {id: {id}})-[e:KNOWS]->(s:Skill {name: {name}})", {id: id, name: skill.name})
    .set("e.level = {level}, e.affinity = {affinity}", {level: skill.level, affinity: skill.affinity});

  console.log(query.compile(true));

  db.cypher({query: query.compile(true)}, callback);
};
