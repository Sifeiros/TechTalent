import React from 'react';
import {
  Button
} from 'react-bootstrap';
import LoadingIndicator from 'components/LoadingIndicator';
import PersonTable from 'components/PersonTable';

class Persons extends React.Component {
  constructor(props) {
    super(props);
    props.fetchPersons();
  }

  render() {
    return (
      <LoadingIndicator isLoading={this.props.isFetching}>
        <PersonTable persons={this.props.persons} />
      </LoadingIndicator>
    );
  }
}

Persons.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  persons: React.PropTypes.array.isRequired,
  error: React.PropTypes.string,
  fetchPersons: React.PropTypes.func.isRequired
};

export default Persons;
