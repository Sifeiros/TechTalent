import { connect } from 'react-redux';
import { fetchPersons, setSearchParams } from '../modules/persons';
import { fetchSkills } from '../modules/skills';

import Persons from '../components/Persons';

const mapDispatchToProps = {
  fetchPersons,
  setSearchParams,
  fetchSkills
};

const mapStateToProps = (state) => ({
  persons : state.persons,
  skills : state.skills
});

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
