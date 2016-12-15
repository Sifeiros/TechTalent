var personsdb = require('./persons');

var allPersons = require('./person-mocks');

exports.allPersons = allPersons.persons;

exports.findPeopleWithSkills = function (skills, inferranceAllowed, callback) {
  return personsdb.findPersonWithSkills(skills, inferranceAllowed, callback);
};

exports.findPerson = function (id, inferSkills, callback) {
  personsdb.findPerson(id, inferSkills, callback);
};

function findPerson(persons, id) {
  // TODO Replace with actual search
  return persons.persons.filter(function (person) {
    return person.id === id;
  });
}
