import React from 'react';
import { useStateValue } from '../StateManager/StateContext';

const RatePanel = ()=> {
    const [{ rate }] = useStateValue();
    return  <div className="RatePanel">
                <div>Rate:</div>
                <div>{rate.value}</div>
                <div>Date:</div>
                <div>{rate.date}</div>
            </div>
}

export default RatePanel;