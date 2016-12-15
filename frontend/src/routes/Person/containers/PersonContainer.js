import { connect } from 'react-redux';
import { fetchPerson, update } from '../modules/person';

import Person from '../components/Person';

const mapDispatchToProps = {
  fetchPerson,
  update
};

const mapStateToProps = (state) => ({
  isFetching : state.person.isFetching,
  isFetched : state.person.isFetched,
  person: state.person.person,
  error: state.person.error
});

export default connect(mapStateToProps, mapDispatchToProps)(Person);
