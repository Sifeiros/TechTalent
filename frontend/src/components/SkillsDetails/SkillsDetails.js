import React from 'react';
import {
  Panel
} from 'react-bootstrap';
import { Chart } from 'react-google-charts';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import 'bootstrap-slider/dist/css/bootstrap-slider.min.css';

class SkillsDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      minLevel: 3,
      minAffinity: 3
    };

    this.updateLevel = this.updateLevel.bind(this);
    this.updateAffinity = this.updateAffinity.bind(this);
  }

  updateLevel (event) {
    this.setState({ minLevel: event.target.value });
  }

  updateAffinity (event) {
    this.setState({ minAffinity: event.target.value });
  }

  render () {
    let data = [
      ['Tech', 'Users']
    ];

    this.props.skills.forEach(function (skill) {
      let count = skill.values.filter(function (skill) {
        return skill.level >= this.state.minLevel && skill.affinity >= this.state.minAffinity;
      }, this).length;
      data.push([skill.skill, count]);
    }, this);

    return (
      <div className='row'>
        <div className='col-md-6'>
          <Panel header='Skills'>
            <form className='form-horizontal'>
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Level</label>
                <div className='col-sm-10'>
                  <ReactBootstrapSlider
                    value={this.state.minLevel}
                    change={this.updateLevel}
                    slideStop={this.updateLevel}
                    step={1}
                    max={5}
                    min={1} />
                </div>
              </div>
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Affinity</label>
                <div className='col-sm-10'>
                  <ReactBootstrapSlider
                    value={this.state.minAffinity}
                    change={this.updateAffinity}
                    slideStop={this.updateAffinity}
                    step={1}
                    max={5}
                    min={1} />
                </div>
              </div>
            </form>
            <Chart
              chartType='PieChart'
              data={data}
              options={{ chartArea: { 'width': '100%', 'height': '100%' } }}
              graph_id='PieChart'
              width='100%'
              height='400px'
              legend_toggle
            />
          </Panel>
        </div>
        <div className='col-md-6' />
      </div>
    );
  }
}

SkillsDetails.propTypes = {
  skills: React.PropTypes.array.isRequired
};

export default SkillsDetails;
