import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter'
import { useStateValue } from '../StateManager/StateContext';
import Actions from '../StateManager/Actions';
import ApiConfig from '../common/ApiConfig';
import PropTypes from 'prop-types';

const apiConfig = ApiConfig.ExchangeRates;
const cache = setupCache({
    maxAge: 15 * 60 * 1000
  });
const api = axios.create({
    adapter: cache.adapter
});
function sortObject(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

const CurrenciesList = (props) =>
{    
    const [{ primary, secondary }, dispatch] = useStateValue();
    const [data, setData] = useState({ currencies: {} });
    useEffect(() => {
        async function fetchData()
        {
            const result = await api(apiConfig.url+"latest");
            let obj = {...result.data.rates }
            obj[result.data.base]=1.0;
            setData({currencies: sortObject(obj)});
        }        
        fetchData();
    }, []);

    const isPrimaryCurrency = props.id === 'PrimaryCurrency';
    const onChangeDefault = (value) =>{
        let type = isPrimaryCurrency ? Actions.setPrimaryCurrency : Actions.setSecondaryCurrency;
        let dispatchObject = {
            type: type,
            currency : value};    
        dispatch(dispatchObject);
    };

    return (
        <select id={`${props.id}_list`} 
        onChange={event => 
            {
                let value = event.target.value;
                let primaryCurrency = isPrimaryCurrency ? value : primary.currency;
                let secondaryCurrency = isPrimaryCurrency ? secondary.currency : value;
                onChangeDefault(event.target.value);
                props.onChange(primary.value,primaryCurrency,secondaryCurrency);
            } 
        } 
        value={props.defaultCurrency}>
          {
            Object.keys(data.currencies).map((key, index) => <option value={key} key={key} title={data.currencies[key]} >{key}</option>)              
          }
        </select>
    );
}
CurrenciesList.propTypes = {
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func
}

export default CurrenciesList;