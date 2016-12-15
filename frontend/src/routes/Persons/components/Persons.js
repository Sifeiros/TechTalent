import React from 'react';
import LoadingIndicator from 'components/LoadingIndicator';
import PersonTable from 'components/PersonTable';
import PersonSearchForm from 'components/PersonSearchForm';
import './Persons.scss';

class Persons extends React.Component {
  constructor(props) {
    super(props);
    props.fetchPersons();
    props.fetchSkills();
  }

  render() {
    return (
      <div>
        <LoadingIndicator isFetched={this.props.skills.isFetched}
                          element={PersonSearchForm}
                          setSearchParams={this.props.setSearchParams}
                          options={this.props.skills.skills}
                          params={this.props.persons.params}
        />
        <LoadingIndicator isFetched={this.props.persons.isFetched}
                          element={PersonTable}
                          persons={this.props.persons.persons}/>
      </div>
    );
  }
}

Persons.propTypes = {
  persons: React.PropTypes.object.isRequired,
  skills: React.PropTypes.object.isRequired,
  fetchPersons: React.PropTypes.func.isRequired,
  fetchSkills: React.PropTypes.func.isRequired,
  setSearchParams: React.PropTypes.func.isRequired
};

export default Persons;
