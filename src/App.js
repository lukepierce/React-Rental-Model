import React, { Component } from 'react';
import { connect } from 'react-redux'
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
    inputData: store.inputData
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
          <div><p>{this.props.inputData.nYears}</p></div>
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
    inData: store.output
  };
})
class MoneyData extends React.Component {
  constructor (props) {
    super(props);
    console.log('Constructor');
    console.log('State:')
  }

  render() {
    if(this.props.inData.years.length > 0) {
      return (
        <Plot
          data={[
            {
              x: this.props.inData.years,
              y: this.props.inData.netWorth,
              type: 'scatter',
              mode: 'lines+points',
              marker: {color: 'red'},
            }
          ]}
          layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
        />
      );
    } else {
      return(
        <div>Empty Render</div>
      );
    }
  }
    
}

export default App;
