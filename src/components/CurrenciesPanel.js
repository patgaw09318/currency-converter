import React from 'react';
import CurrenciesList from './CurrenciesList';
import PropTypes from 'prop-types';

const CurrenciesPanel = (props)=>(
    <div id={`${props.id}_panel`}>
        <input></input>
        <CurrenciesList id={`${props.id}`}></CurrenciesList>
    </div>
)

CurrenciesPanel.propTypes = {
    id: PropTypes.string.isRequired
}

export default CurrenciesPanel;