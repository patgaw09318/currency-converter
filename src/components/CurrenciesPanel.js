import React, { useRef, useEffect } from 'react';
import CurrenciesList from './CurrenciesList';
import { useStateValue } from '../StateManager/StateContext';
import Actions from '../StateManager/Actions';
import ApiConfig from "../common/ApiConfig";
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter'
import Decimal from "decimal.js-light";
import RatePanel from './RatePanel';

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
    const isFirstRun = useRef(true);
    const [{ primary, secondary }, dispatch] = useStateValue();
    const onChange = (_primaryValue, _primaryCurrency, _secondaryCurrency)=>{
        fetchData(_primaryCurrency,_secondaryCurrency).then(response=>{
        let data = response.data;
        let primaryValue = new Decimal(_primaryValue || 0);
        let rate = new Decimal(data.rates[_secondaryCurrency]);
        let secondaryValue = primaryValue.mul(rate).toDecimalPlaces(2).toString();
        let dispatchObject={
            type: Actions.setSecondaryValue,
            value: secondaryValue
        };
        dispatch(dispatchObject);
        dispatchObject={
            type: Actions.setRate,
            rate: {
                value: rate.toDecimalPlaces(2).toString(),
                date: data.date}
            };
        dispatch(dispatchObject);
        });
    };
  
    useEffect (() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            onChange(primary.value,primary.currency,secondary.currency);
        }
    });

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
            <RatePanel></RatePanel>
        </div>
    )
}

export default CurrenciesPanel;