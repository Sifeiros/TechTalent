import React from 'react';
import {
  Panel
} from 'react-bootstrap';

export const SkillsDetails = function (props) {
  return (
    <Panel header="Skills">
      {props.skills.length}
    </Panel>
  );
};

SkillsDetails.propTypes = {
  skills: React.PropTypes.array.isRequired
};

export default SkillsDetails;
