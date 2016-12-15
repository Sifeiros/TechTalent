import React from 'react';
import SkillBadge from 'components/SkillBadge';

class SkillOverview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var skills = this.props.skills.map((skill) => ( this.props.update ? <SkillBadge key={skill.name} skill={skill} update={this.props.update.bind(this, skill.name)}/> : <SkillBadge key={skill.name} skill={skill}/>
      ));
    return (
      <span>
      {skills}
    </span>
    );
  }
}

SkillOverview.propTypes = {
  skills: React.PropTypes.array.isRequired,
  update: React.PropTypes.func
};

export default SkillOverview;
