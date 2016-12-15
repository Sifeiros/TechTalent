import React from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
import PersonPanel from 'components/PersonPanel';

class Person extends React.Component {
  constructor (props) {
    super(props);
    props.fetchPerson(props.params.id);
  }

  render () {
    return (
      <LoadingIndicator isFetched={this.props.isFetched} error={this.props.error}
        element={PersonPanel}
        person={this.props.person} />
    );
  }
}

Person.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  isFetched: React.PropTypes.bool.isRequired,
  person: React.PropTypes.object,
  error: React.PropTypes.string,
  fetchPerson: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired
};

export default Person;
