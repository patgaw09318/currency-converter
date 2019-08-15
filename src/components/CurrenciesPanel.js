import React from 'react';
import CurrenciesList from './CurrenciesList';
import { useStateValue } from '../StateManager/StateContext';
import Actions from '../StateManager/Actions';
import ApiConfig from "../common/ApiConfig";
import axios from 'axios';
import Decimal from "decimal.js-light";

const ExchangeRates = ApiConfig.ExchangeRates;

/*async function fetchData(from,to)
{
  return await axios(ExchangeRates.url+`latest?symbols=${to}&base=${from}`);
}

const onChange = (from,to,setFrom,setTo)=>{
  fetchData(from.currency,to.currency).then(response=>{
    let data = response.data;
    let fromValue = new Decimal(from.value);
    let rate = new Decimal(data.rates[to.currency]);
    let toValue = fromValue.dividedBy(rate).toDecimalPlaces(2).toString();
    console.log(toValue);
    setTo({...to,value: toValue})
  });
};*/

const CurrenciesPanel = (props)=>{
  const [{ primary, secondary }, dispatch] = useStateValue();
    return(
        <div className="CurrenciesPanelComponent">
            <input id="PrimaryValue" type="number" step="any" placeholder="0.00" 
            defaultValue={primary.value} 
            onChange={(event)=>{
               let dispatchObject = {
                    type: Actions.setPrimaryValue,
                    value : event.target.value};                
                dispatch(dispatchObject);
            }}>
            </input>
            <CurrenciesList id="PrimaryCurrency" defaultCurrency={props.defaultCurrency}></CurrenciesList>
            <div id="SecondaryValue">{secondary.value}</div>
            <CurrenciesList id="SecondaryCurrency" defaultCurrency={props.defaultCurrency}></CurrenciesList>
        </div>
    )
}

export default CurrenciesPanel;