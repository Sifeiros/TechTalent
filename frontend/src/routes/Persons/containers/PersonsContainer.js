import {connect} from 'react-redux';
import {fetchPersons, setSearchParams} from '../modules/persons';
import {fetchSkills} from '../modules/skills';

import Persons from '../components/Persons';
import {createSelector} from 'reselect'

const mapDispatchToProps = {
  fetchPersons,
  setSearchParams,
  fetchSkills
};

const getPersons = (state) => state.persons;
const injectSearchIntoPersons = createSelector(getPersons, function (persons) {
  persons.persons.forEach(function (person) {
    person.skills.forEach(function (skill) {
      skill.ignored = persons.params.skills && persons.params.skills.length ? persons.params.skills.indexOf(skill.name) === -1 : false;
    });
  });
  return persons;
});

const mapStateToProps = (state) => ({
  persons: injectSearchIntoPersons(state),
  skills: state.skills
});

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
