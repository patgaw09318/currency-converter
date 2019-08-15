import React from 'react';
import CurrenciesList from './CurrenciesList';
import { useStateValue } from '../StateManager/StateContext';
import Actions from '../StateManager/Actions';
import ApiConfig from "../common/ApiConfig";
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter'
import Decimal from "decimal.js-light";

const apiConfig = ApiConfig.ExchangeRates;
const cache = setupCache({
    maxAge: 15 * 60 * 1000
  });
const api = axios.create({
    adapter: cache.adapter
});
async function fetchData(from,to)
{
  return await api(apiConfig.url+`latest?symbols=${to}&base=${from}`);
}

const CurrenciesPanel = (props)=>{
  const [{ primary, secondary, rate }, dispatch] = useStateValue();
  const onChange = (_primaryValue, _primaryCurrency, _secondaryCurrency)=>{
    fetchData(_primaryCurrency,_secondaryCurrency).then(response=>{
      let data = response.data;
      let primaryValue = new Decimal(_primaryValue || 0);
      let _rate = new Decimal(data.rates[_secondaryCurrency]);
      let secondaryValue = primaryValue.mul(_rate).toDecimalPlaces(2).toString();
      let dispatchObject={
          type: Actions.setSecondaryValue,
          value: secondaryValue
      };
      dispatch(dispatchObject);
      dispatchObject={
        type: Actions.setRate,
        rate: {
            value: _rate.toDecimalPlaces(2).toString(),
            date: data.date}
        };
    dispatch(dispatchObject);
    });
  };

    return(
        <div className="CurrenciesPanelComponent">
            <input id="PrimaryValue" type="number" step="any" placeholder="0.00" 
            defaultValue={primary.value} 
            onChange={(event)=>{
                let primaryValue = event.target.value;
               let dispatchObject = {
                    type: Actions.setPrimaryValue,
                    value : event.target.value};                
                dispatch(dispatchObject);
                onChange(primaryValue,primary.currency,secondary.currency);
            }}>
            </input>
            <CurrenciesList id="PrimaryCurrency" defaultCurrency={primary.currency} onChange={onChange}></CurrenciesList>
            <div id="SecondaryValue">{secondary.value}</div>
            <CurrenciesList id="SecondaryCurrency" defaultCurrency={secondary.currency} onChange={onChange}></CurrenciesList>
            <div id="RatePanel">
                <div>Rate:</div>
                <div>{rate.value}</div>
                <div>Date:</div>
                <div>{rate.date}</div>
            </div>
        </div>
    )
}

export default CurrenciesPanel;