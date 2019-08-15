import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useStateValue } from '../StateManager/StateContext';
import Actions from '../StateManager/Actions';
import ApiConfig from '../common/ApiConfig';
import PropTypes from 'prop-types';

const api = ApiConfig.ExchangeRates;
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
            const result = await axios(api.url+"latest");
            let obj = {...result.data.rates }
            obj[result.data.base]=1.0;
            setData({currencies: sortObject(obj)});
        }
        
        fetchData();
    }, []);

    const onChange = (value) =>{
        let type = props.id === 'PrimaryCurrency' ? Actions.setPrimaryCurrency : Actions.setSecondaryCurrency;
        let dispatchObject = {
            type: type,
            currency : value};    
        dispatch(dispatchObject);
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
    id: PropTypes.string.isRequired
}

export default CurrenciesList;