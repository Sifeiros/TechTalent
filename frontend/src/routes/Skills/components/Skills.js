import React from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
import SkillsDetails from 'components/SkillsDetails';

class Skills extends React.Component {
  constructor(props) {
    super(props);
    props.fetchSkills();
  }

  render() {
    return (
      <LoadingIndicator isFetched={this.props.isFetched} error={this.props.skills.error}
                        element={SkillsDetails}
                        skills={this.props.skills}
      />
    );
  }
}

Skills.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  isFetched: React.PropTypes.bool.isRequired,
  error: React.PropTypes.string,
  skills: React.PropTypes.array.isRequired,
  fetchSkills: React.PropTypes.func.isRequired
};

export default Skills;
