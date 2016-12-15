import React from 'react';
import './SkillBadge.scss';

var skillBadgeChildClass = function (variant, value, clickable) {
  return 'skill-badge-' + variant + ' skill-badge-color-' + value + (clickable? ' skill-badge-active' : '');
};

var skillBadgeClass = function (skill) {
  let classes = ['skill-badge'];
  if (skill.ignored) {
    classes.push('skill-badge-ignored');
  }
  if (skill.inferred) {
    classes.push('skill-badge-inferred');
  }
  return classes.join(' ');
};

class SkillBadge extends React.Component {
  constructor(props) {
    super(props);
    this.incrementLevel = this.incrementLevel.bind(this);
    this.incrementAffinity = this.incrementAffinity.bind(this);
  }

  incrementAffinity() {
    if(!this.props.update) return;
    this.props.skill.affinity++;
    if(this.props.skill.affinity > 5) this.props.skill.affinity = 1;
    console.log(this.props);
    this.props.update(this.props.skill);
  }

  incrementLevel() {
    if(!this.props.update) return;
    this.props.skill.level++;
    if(this.props.skill.level > 5) this.props.skill.level = 1;
    this.props.update(this.props.skill);
  }

  render() {
    if (this.props.skill.inferred) {
      return (
        <div className={skillBadgeClass(this.props.skill)}>
          <div className='skill-badge-name'>{this.props.skill.name}</div>
        </div>
      );
    } else {
      return (
        <div className={skillBadgeClass(this.props.skill)}>
          <div className={skillBadgeChildClass('level', this.props.skill.level, !!this.props.update)}
               onClick={this.incrementLevel}>{this.props.skill.level}</div>
          <div className='skill-badge-name'>{this.props.skill.name}</div>
          <div className={skillBadgeChildClass('affinity', this.props.skill.affinity, !!this.props.update)}
               onClick={this.incrementAffinity}>{this.props.skill.affinity}</div>
        </div>
      );
    }
  }
}

SkillBadge.propTypes = {
  skill: React.PropTypes.object.isRequired,
  update: React.PropTypes.func
};

export default SkillBadge;
