import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from "redux-thunk";
import logger from "redux-logger";
import {reducer as formReducer} from 'redux-form';


const initialOutput = {
  years: [],
  netWorth: [],
  properties: [],
  timeLine: new TimeLine(),
};

const initialInputData = {
  apr: 4.1,
  principle: 10000,
  nYears: 10,
  yearlyContrib: 10000,
  targetHousePrice: 250000,
  maxLoad: .80
};

function cloneObject(obj) {
  let clone = Object.assign( Object.create( Object.getPrototypeOf(orig)), orig);
  return clone;
}

// TODO account for interest, account for principle deduction for asset
class Mortgage {
  constructor(principle, apr, nYears) {
    this.principle = principle;
    this.apr = apr;
    this.nYears = nYears;
    this.nPaymentsLeft = 12 * nYears;
    let mApr = this.monthlyInterestRate();
    this.monthlyPayment = this.principle * (mApr * Math.pow(1 +  mApr, this.nPaymentsLeft))/(Math.pow(1 + mApr, this.nPaymentsLeft) - 1);
  }

  monthlyInterestRate() {
    return this.apr / 12;
  }

  hasPaymentsLeft() {
    return this.nPaymentsLeft > 0;
  }

  makeMonthlyPayment() {
    if(this.hasPaymentsLeft()) {
      this.nPaymentsLeft--;
      return this.monthlyPayment;
    }
    return 0;
  }

  clone() {
    return cloneObject(this);
  }
}

class AssetSheet {
  constructor() {
    this.cash = 0;
    this.properties = [];
  }

  addProperty(initValue, pHouseValue, rentalIncome, mortgage, date) {
    let id = this.properties.length;
    this.properties.push(new PropertyAsset({id, ...arguments}));
  }

  addCash(amount) {
    this.cash += amount;
    return this.cash;
  }

  getCash() {return this.cash};

  clone() {
    let newObj = cloneObject(this);
    for(prop in newObj.properties)
      prop = prop.clone();
    return newObj;
  }

}


class TimeLine {
  constructor(date, cashFlow, assetSheet, events) {
    this.initDate = date;
    this.timePoint = [];
  }

  addDate(date, cashFlow, assetSheet, events) {
    this.timePoint.push({
      date: date, 
      cashFlow: cashFlow, 
      assetSheet: assetSheet,
      events: events});
      return this.timePoint.slice(-1)[0];
  }

  lastTimePoint() {
    return this.timePoint.slice(-1)[0];
  }

}

class PropertyAsset {
  constructor(id, initValue, pHouseValue, rentalIncome,
              mortgage, date) {
    this.id = id;
    this.purchaseDate = date;
    this.mortgage = mortgage;
    this.nYearsDepreciationLeft = 27.5;
    this.initialValue = initValue;
    this.currentValue = this.initialValue;
    this.pValueIsHouse = pHouseValue;
    this.rentalIncome = rentalIncome;
    this.vacancyRate = .1;
    this.maintenanceRate = .01; 
  }

  depreciate() {
    let yearlyDepreciation = (this.initialValue * this.pValueIsHouse)/27.5;
    if(this.nYearsDepreciationLeft >= 1) {
      this.nYearsDepreciationLeft -= 1;
      return yearlyDepreciation;
    } else if(this.nYearsDepreciationLeft > 0) {
      let depreciationValue = this.nYearsDepreciationLeft * yearlyDepreciation;
      this.nYearsDepreciationLeft = 0;
      return depreciationValue;
    }
    return 0.0;
  }

  increaseRent(pIncrease) {
    this.rentalIncome = (1 + pIncrease) * this.rentalIncome;
  }

  getMonthlyRentIncome() {
    return this.rentalIncome * (1-this.vacancyRate);
  }

  getMonthlyMaintenance() {
    return this.maintenanceRate * this.currentValue;
  }

  clone() {
    let newObj = cloneObject(this);
    newObj.mortgage = this.mortgage.clone();
    return newObj;
  }

}


const calcReducer = (state=initialOutput, action) => {
  if(action.type == "InputChange") {
      let inputData = action.payload;
      let years = [];
      let netWorth = [];
      let curWorth = inputData.principle;
      for(let i = 0; i < inputData.nYears; i++) {
        years.push(i);
        curWorth = curWorth * (1 + (inputData.apr/100));
        netWorth.push(curWorth);
      }
      return {...state, years: years, netWorth: netWorth};
  }
 
  console.log("calcReducer", action);
  return state;
}

const inputReducer = (state = initialInputData, action) => {
  if(action.type == "InputChange") {
    return {...state, ...action.payload};
  }
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
