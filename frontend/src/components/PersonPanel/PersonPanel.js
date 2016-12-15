import React from 'react';
import {
  Panel
} from 'react-bootstrap';
import SkillOverview from 'components/SkillOverview';
import './PersonPanel.scss';

export const PersonPanel = function (props) {
  const title = <h3>{props.person.displayName}</h3>;
  return (
    <Panel header={title}>
      <img src={`/user_icons/default.png`} alt='Profile Picture' className='person-panel-picture' />
      <SkillOverview skills={props.person.skills} update={props.update} />
    </Panel>
  );
};

PersonPanel.propTypes = {
  person: React.PropTypes.object.isRequired,
  update: React.PropTypes.func.isRequired
};

export default PersonPanel;
