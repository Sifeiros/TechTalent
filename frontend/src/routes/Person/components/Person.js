import React from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
import PersonPanel from 'components/PersonPanel';

class Person extends React.Component {
  constructor(props) {
    super(props);
    props.fetchPerson(props.params.id);
  }

  render() {
    return (
      <LoadingIndicator isLoading={this.props.isFetching}>
        <PersonPanel person={this.props.person}/>
      </LoadingIndicator>
    );
  }
}

Person.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  person: React.PropTypes.object,
  error: React.PropTypes.string,
  fetchPerson: React.PropTypes.func.isRequired
};

export default Person;
