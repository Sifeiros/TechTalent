import React from 'react';
import {
  Table
} from 'react-bootstrap';
import SkillOverview from 'components/SkillOverview';
import { Link } from 'react-router';

export const PersonTable = function (props) {
  var trs = props.persons.map((person) => (
    <tr key={person.id}>
      <td>
        <Link to={`/persons/${person.id}`}>{person.id}</Link>
      </td>
      <td>
        <Link to={`/persons/${person.id}`}>{person.displayName}</Link>
      </td>
      <td><SkillOverview skills={person.skills} /></td>
    </tr>
  ));

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Skills</th>
        </tr>
      </thead>
      <tbody>
        {trs}
      </tbody>
    </Table>
  );
};

PersonTable.propTypes = {
  persons: React.PropTypes.array.isRequired
};

export default PersonTable;
