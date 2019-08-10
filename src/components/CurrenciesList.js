import React, {useState,useEffect} from 'react';
import axios from 'axios';
import ApiConfig from '../common/ApiConfig'
import PropTypes from 'prop-types';

const api = ApiConfig.ExchangeRates;
function sortObject(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

const CurrenciesList = (props) =>
{
    const [data, setData] = useState({ currencies: {} });
    useEffect(() => {
        async function fetchData()
        {
            const result = await axios(api.url+"latest");
            let obj = {...result.data.rates }
            obj[result.data.base]=1.0;
            setData({currencies: sortObject(obj)});
        }
        
        fetchData();
    }, []);

    const onChange = (value) =>{
        props.setValue({currency: value})
    };
  
    return (
        <select id={`${props.id}_list`} onChange={event => onChange(event.target.value)} value={props.defaultCurrency}>
          {
            Object.keys(data.currencies).map((key, index) => <option value={key} key={key} title={data.currencies[key]} >{key}</option>)              
          }
        </select>
    );
}
CurrenciesList.propTypes = {
    id: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired
}

export default CurrenciesList;