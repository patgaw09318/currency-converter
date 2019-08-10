import React, {useState,useEffect} from 'react';
import axios from 'axios';
import ApiConfig from '../common/ApiConfig'
const api = ApiConfig.Currencies;
const CurrenciesList = () =>
{
    const [data, setData] = useState({ currencies: {} });
    useEffect(() => {
        async function fetchData()
        {
            const result = await axios(api.url+api.methods.currencies);
            setData({currencies: result.data});}
            fetchData();
    }, []);
  
    return (
        <select>
          {
              Object.keys(data.currencies).map((key, index) => <option value={key} key={index}>{data.currencies[key]}</option>)              
          }
        </select>
    );
  }
export default CurrenciesList;