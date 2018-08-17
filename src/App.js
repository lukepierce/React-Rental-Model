import React, { Component } from 'react';
import { connect } from 'react-redux'
import store from  './store.js';

import logo from './logo.svg';
import './App.css';
import store from './store.js'
import DataInputForm from './DataInputForm'
import Plot from 'react-plotly.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <DataInputForm />
        <br/><br/>

        <CashFlow />
        <br/><br/>
        <MoneyData />

      </div>
    );
  }
}
/*
@connect((store) => {
  console.log("Passing Store Along", store)
  return store.input;
})
class InputForm extends Component {
  render() {
    console.log(this.props);
    return(
      <div className="InputForm">
        <form>
          Number of Years: <input type="text" name="nYears" value={this.props.nYears}/><br/>
          Amount of Money Contributed Per Year: <input type="text" name="moneyContributed"/><br/>
          Maximum Leverage: <input type="text" name="Maximum Leverage"/><br/>
        </form>
      </div>
    );
  }
}
*/



/*
@connect((store) => {
  return {
    dataStore: store.form
  };
})
class DataAnalytics extends React.Component {
  submit(values) {
    // print the form values to the console
    console.log('Submitting')
    console.log(values)
    store.dispatch({type: "CALC", payload: true})
  }
  render() {
    return <InputForm onSubmit={this.submit} />
  }
}
*/
/*
class InputPage extends React.Component {
  submit(values) {
    // print the form values to the console
    console.log('Submitting')
    console.log(values)
    store.dispatch({type: "CALC", payload: true})
  }
  render() {
    return <InputForm onSubmit={this.submit} />
  }
}
*/
@connect((store) => {
  return {
    inputData: store.form
  };
})
class CashFlow extends React.Component {
  constructor (props) {
    super(props);
  }
  //<h1>{this.props.inputData.contact.values.firstName}</h1>
  handleClick() {
    let that = this;
    console.log("Simple Prop", this.props);
    console.log("Prop", this.props.inputData);
    //console.log("Prop", this.props.inputData.contact.values.firstName);
  }
  render() {
    return(
      <div className="cashFlow">

          Calculation: <input type="text" name="calc"/>
          <button onClick={this.handleClick.bind(this)}>
            Activate Lasers
          </button>
      </div>
    );
  }
}

@connect((store) => {
  return {
    inputData: store.form
  };
})
class MoneyData extends React.Component {
  constructor (props) {
    super(props);
    console.log('Constructor');
    console.log('State:')
  }

  render() {
    return (
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+points',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      />
    );
  }
}

export default App;
