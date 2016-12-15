import React from 'react';
import './SkillBadge.scss';

var skillBadgeChildClass = function (variant, value) {
  return 'skill-badge-' + variant + ' skill-badge-color-' + value;
};

var skillBadgeClass = function (skill) {
  let classes = ['skill-badge'];
  if(skill.ignored) {
    classes.push('skill-badge-ignored');
  }
  if(skill.inferred) {
    classes.push('skill-badge-inferred');
  }
  return classes.join(' ');
};

export const SkillBadge = function (props) {
  if (props.skill.inferred) {
    return (
      <div className={skillBadgeClass(props.skill)}>
        <div className='skill-badge-name'>{props.skill.name}</div>
      </div>
    );
  } else {
    return (
      <div className={skillBadgeClass(props.skill)}>
        <div className={skillBadgeChildClass('level', props.skill.level)}>{props.skill.level}</div>
        <div className='skill-badge-name'>{props.skill.name}</div>
        <div className={skillBadgeChildClass('affinity', props.skill.affinity)}>{props.skill.affinity}</div>
      </div>
    );
  }
};

SkillBadge.propTypes = {
  skill: React.PropTypes.object.isRequired
};

export default SkillBadge;
