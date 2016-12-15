import { connect } from 'react-redux';
import { fetchPersons } from '../modules/persons';

import Persons from '../components/Persons';

const mapDispatchToProps = {
  fetchPersons
};

const mapStateToProps = (state) => ({
  isFetching : state.persons.isFetching,
  persons: state.persons.persons,
  error: state.persons.error
});

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
