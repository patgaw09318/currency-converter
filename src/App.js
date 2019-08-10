import React, {useState} from "react";
import CurrenciesPanel from "./components/CurrenciesPanel";
import ApiConfig from "./common/ApiConfig";
import axios from 'axios';
import Decimal from "decimal.js-light";

const ExchangeRates = ApiConfig.ExchangeRates;

async function fetchData(from,to)
{
  return await axios(ExchangeRates.url+`latest?symbols=${to}&base=${from}`);
}

const onChange = (from,to,setFrom,setTo)=>{
  //todo update value of state
  fetchData(from.currency,to.currency).then(response=>{
    let data = response.data;
    let fromValue = new Decimal(from.value);
    let rate = new Decimal(data.rates[to.currency]);
    //let toValue = fromValue.dividedBy(rate).toString(2);
    //setTo({...to,value: toValue})
    console.log(fromValue.toString(2));

  });
};

function App() {
  const [from, setFrom] = useState({ currency: "USD", value: 1 });
  const [to, setTo] = useState({ currency: "EUR" });

  return <div className="App" >
    <div className="Title">Currency converter</div>
    <CurrenciesPanel id="from" 
      onChange={() => onChange(from,to)} 
      setValue={setFrom}
      defaultCurrency={from.currency}>
    </CurrenciesPanel>
    <CurrenciesPanel id="to"
      onChange={() => onChange(from,to,setFrom,setTo)} 
      setValue={setTo} 
      defaultCurrency={to.currency}>
    </CurrenciesPanel>
  </div>;
}

export default App;
