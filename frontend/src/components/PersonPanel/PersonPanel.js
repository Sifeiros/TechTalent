import React from 'react';
import {
  Panel
} from 'react-bootstrap';
import SkillOverview from 'components/SkillOverview';

export const PersonPanel = function (props) {

  if(!props.person) return <span>Not loaded</span>;

  const title = <h3>{props.person.displayName}</h3>;
  return (
    <Panel header={title}>
      <SkillOverview skills={props.person.skills} />
    </Panel>
  );
};

PersonPanel.propTypes = {
  person: React.PropTypes.object
};

export default PersonPanel;
