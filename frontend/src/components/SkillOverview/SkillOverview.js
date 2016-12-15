import React from 'react';
import SkillBadge from 'components/SkillBadge';

export const SkillOverview = function (props) {
  var skills  = props.skills.map((skill) => (<SkillBadge key={skill.name} skill={skill} />));
  return (
    <span>
      {skills}
    </span>
  );
};

SkillOverview.propTypes = {
  skills: React.PropTypes.array.isRequired
};

export default SkillOverview;
