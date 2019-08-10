import React from 'react';
import CurrenciesList from './CurrenciesList';
import PropTypes from 'prop-types';

const CurrenciesPanel = (props)=>(
    <div id={`${props.id}_panel`}>
        <input id={`${props.id}_input`} type="number" step="any" placeholder="0.00" onChange={()=>props.onChange()}></input>
        <CurrenciesList id={`${props.id}`} setValue={props.setValue} defaultCurrency={props.defaultCurrency}></CurrenciesList>
    </div>
)

CurrenciesPanel.propTypes = {
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    defaultCurrency: PropTypes.string.isRequired
}

export default CurrenciesPanel;