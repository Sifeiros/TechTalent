import { connect } from 'react-redux';
import { fetchPerson } from '../modules/person';

import Person from '../components/Person';

const mapDispatchToProps = {
  fetchPerson
};

const mapStateToProps = (state) => ({
  isFetching : state.person.isFetching,
  person: state.person.person,
  error: state.person.error
});

export default connect(mapStateToProps, mapDispatchToProps)(Person);
