import React from 'react';
import './SkillBadge.scss';

var skillBadgeClass = function (variant, value) {
  return 'skill-badge-' + variant + ' skill-badge-color-' + value;
};

export const SkillBadge = function (props) {
  if (props.skill.inferred) {
    return (
      <div className='skill-badge skill-badge-inferred'>
        <div className='skill-badge-name'>{props.skill.name}</div>
      </div>
    );
  } else {
    return (
      <div className='skill-badge'>
        <div className={skillBadgeClass('level', props.skill.level)}>{props.skill.level}</div>
        <div className='skill-badge-name'>{props.skill.name}</div>
        <div className={skillBadgeClass('affinity', props.skill.affinity)}>{props.skill.affinity}</div>
      </div>
    );
  }
};

SkillBadge.propTypes = {
  skill: React.PropTypes.object.isRequired
};

export default SkillBadge;
