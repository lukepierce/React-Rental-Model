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
    super(props);
    this.state = {
      apr: 4.2,
      nYears: 10,
      principle: 10000
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit() {
    console.log("Clicked");
  }

  handleChange(event) {
    console.log("Event", event.target.name)
    let updatedState = {};
    updatedState[event.target.name] = event.target.value;
    this.setState(updatedState);
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
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
        <button type="submit">Submit</button>
      </form>
    )
  }
}



export default DataInputForm
