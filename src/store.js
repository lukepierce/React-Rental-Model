import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from "redux-thunk";
import logger from "redux-logger";
import {reducer as formReducer} from 'redux-form';


const initialState = {
  input: {
    nYears: 1,
    initialPriniciple: 10000
  }
};

const initialOutput = {
  total: 0
};

const initialInputData = {
  apr: 4.1,
  principle: 10000,
  nYears: 10
};

const calcReducer = (state=initialOutput, action) => {
  const newState = {...state};
  switch(action) {
    case "CALC":
      console.log("Calc action has fired");
      state = {...state, total: 20};
  }
  return state;
}

const inputReducer = (state = initialInputData, action) => {
  return state;
}

const passThru = (state = form, action) => {
  console.log('Passing Through');
  console.log('Action', action);
  console.log('State', state);
  return state;
}

const passThru2 = (state = {}, action) => {
  console.log('Passing Through Second');
  console.log('Action', action);
  console.log('State', state);
  return state;
}

const rootReducer = combineReducers({
    output: calcReducer,
    inputData: inputReducer
})

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);
const getStore = () => { return store; };

export default store;
//export function getLine() { return "Hello"; }
// getStore;
//module.exports = { one: 1 };
//exports.default = { one: 1};
