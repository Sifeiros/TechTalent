import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';

class PersonSearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.params;

    this.updateSkills = this.updateSkills.bind(this);
    this.updateInfer = this.updateInfer.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      this.props.setSearchParams(this.state);
    }
  }

  updateSkills(skills) {
    this.setState({skills});
  }

  updateInfer(event) {
    this.setState({infer: !!event.target.checked});
  }

  render() {
    return (
      <form>
        <div className='form-group'>
          <Typeahead onChange={this.updateSkills}
                     options={this.props.options}
                     placeholder='Skills'
                     defaultSelected={this.state.skills}
                     multiple/>
        </div>
        <div className='checkbox'>
          <label>
            <input type='checkbox' onChange={this.updateInfer} checked={this.state.infer} /> Allow inferred
          </label>
        </div>
      </form>
    );
  }
}

PersonSearchForm.propTypes = {
  setSearchParams: React.PropTypes.func.isRequired,
  options: React.PropTypes.array.isRequired
};

export default PersonSearchForm;
