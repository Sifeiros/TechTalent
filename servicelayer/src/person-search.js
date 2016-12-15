var personsdb = require('./persons');

var allPersons = require('./person-mocks');

exports.allPersons = allPersons.persons;

exports.findPeopleWithSkills = function (skills, inferranceAllowed) {
  return findPeopleWithSkills(allPersons, skills, inferranceAllowed);
};

function findPeopleWithSkills(persons, skills, inferranceAllowed) {
  // TODO Replace with actual search
  return persons.persons.filter(function (person) {
    var matchingSkills = [];
    person.skills.forEach(function (skill) {
      if (skill.name === skills) {
        if ((inferranceAllowed === "true") || !skill.inferred) {
          matchingSkills.push(skill);
        }
      }
    });
    return matchingSkills.length > 0;
  });
}

exports.findPerson = function (id, inferSkills, callback) {
  personsdb.findPerson(id, inferSkills, callback);
};

function findPerson(persons, id) {
  // TODO Replace with actual search
  return persons.persons.filter(function (person) {
    return person.id === id;
  });
}
