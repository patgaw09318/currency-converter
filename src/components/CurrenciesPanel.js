import React from 'react';
import CurrenciesList from './CurrenciesList';
import PropTypes from 'prop-types';

const CurrenciesPanel = (props)=>(
    <div id={`${props.id}_panel`}>
        <input id={`${props.id}_input`} type="number" step="any" placeholder="0.00" onChange={()=>props.onChange(`${props.id}_input`)}></input>
        <CurrenciesList id={`${props.id}`}></CurrenciesList>
    </div>
)

CurrenciesPanel.propTypes = {
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default CurrenciesPanel;