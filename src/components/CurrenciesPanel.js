import React from 'react';
import CurrenciesList from './CurrenciesList';

const CurrenciesPanel = (props)=>(
    <div id={`${props.id}_panel`}>
        <input></input>
        <CurrenciesList id={`${props.id}_list`}></CurrenciesList>
    </div>
)

export default CurrenciesPanel;