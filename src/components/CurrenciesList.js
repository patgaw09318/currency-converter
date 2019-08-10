import React, {useState,useEffect} from 'react';
import axios from 'axios';
import ApiConfig from '../common/ApiConfig'
import PropTypes from 'prop-types';
const api = ApiConfig.Currencies;

const CurrenciesList = (props) =>
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
        <select id={`${props.id}_list`}>
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