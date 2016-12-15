exports.allPersons = require('./person-mocks');

exports.findPeopleWithSkills = function (skills) {
  return findPeopleWithSkills(exports.allPersons, skills);
};

function findPeopleWithSkills(persons, skills) {
  // TODO Replace with actual search
  return persons.persons.filter(function (person) {
    var result = false;
    person.skills.forEach(function (skill) {
      if (skill.name === skills) {
        result = true;
      }
    });
    return result;
  });
}

exports.findPerson = function (id) {
  return findPerson(exports.allPersons, id);
};

function findPerson(persons, id) {
  // TODO Replace with actual search
  return persons.persons.filter(function (person) {
    return person.id === id;
  });
}
