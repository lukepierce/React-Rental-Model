import React from 'react'
import { connect } from 'react-redux'
import store from  './store.js';

@connect((store) => {
  return {
    inputData: store.inputData
  };
})
class DataInputForm extends React.Component {
  constructor (props) {
    super(props);/*
    this.state = {
      apr: this.props.inputData.apr,
      nYears: this.props.inputData.nYears,
      principle: this.props.inputData.principle,
      yearlyContrib: this.props.inputData.yearlyContrib,
      maxLoad: this.props.inputData.maxLoad,
      targetHousePrice: this.props.inputData.targetHousePrice
    }*/
    this.state = {...this.props.inputData};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit() {
    /*
    let payload = {
      apr: this.state.apr,
      nYears: this.state.nYears,
      principle: this.state.principle,
      yearlyContrib: this.state.yearlyContrib,
      
    };*/
    let payload = {...this.state};
    store.dispatch({type: "InputChange", payload: payload});
    return false;
  }

  handleChange(event) {
    console.log("Event", event.target.name)
    let updatedState = {};
    updatedState[event.target.name] = event.target.value;
    this.setState(updatedState);
  }


  render() {
    return (
      <div>
        <div>
          <label>APR</label>
          <input type="text" name="apr" value={this.state.apr} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="nYears">Number of Years</label>
          <input name="nYears" type="text" value={this.state.nYears} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="principle">Starting Principle</label>
          <input name="principle" type="text" value={this.state.principle} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="contrib">Yearly Contribution</label>
          <input name="yearlyContrib" type="text" value={this.state.yearlyContrib} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="maxLoad">Max Load</label>
          <input name="maxLoad" type="text" value={this.state.maxLoad} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="housePrice">Target House Price</label>
          <input name="targetHousePrice" type="text" value={this.state.targetHousePrice} onChange={this.handleChange} />
        </div>
        <div>
          <button onClick={this.handleSubmit.bind(this)}>Submit</button>
        </div>
      </div>
    )
  }
}



export default DataInputForm
