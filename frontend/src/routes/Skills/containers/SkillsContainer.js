import { connect } from 'react-redux';
import { fetchSkills } from '../modules/skills';

import Skills from '../components/Skills';

const mapDispatchToProps = {
  fetchSkills
};

const mapStateToProps = (state) => ({
  isFetching : state.skills.isFetching,
  isFetched : state.skills.isFetched,
  skills: state.skills.skills,
  error: state.skills.error
});

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
