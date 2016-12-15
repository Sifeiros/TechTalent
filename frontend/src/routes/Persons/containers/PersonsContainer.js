import { connect } from 'react-redux';
import { fetchPersons, setSearchParams } from '../modules/persons';
import { fetchSkills } from '../../Skills/modules/skills';

import Persons from '../components/Persons';
import { createSelector } from 'reselect';

const mapDispatchToProps = {
  fetchPersons,
  setSearchParams,
  fetchSkills
};

const getPersons = (state) => Object.assign({}, state.persons);
const injectSearchIntoPersons = createSelector(getPersons, function (persons) {
  persons.persons.forEach(function (person) {
    person.skills.forEach(function (skill) {
      let skills = persons.params.skills;
      skill.ignored = skills && skills.length && skills.indexOf(skill.name) === -1;
    });
  });
  return persons;
});

const getSkills = (state) => state.skills;
const flattenSkills = createSelector(getSkills, function (skills) {
  return Object.assign({}, skills, {
    skills: skills.skills ? skills.skills.map((skillObject) => skillObject.skill) : null
  });
});

const mapStateToProps = (state) => ({
  persons: injectSearchIntoPersons(state),
  skills: flattenSkills(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
