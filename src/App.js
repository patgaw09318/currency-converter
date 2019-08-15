import React from "react";
import CurrenciesPanel from "./components/CurrenciesPanel";
import { StateProvider } from './StateManager/StateContext';
import Reducer from './StateManager/Reducer';

const App = () => {
  const initialState = {
    primary: {currency: 'EUR', value: '0'},
    secondary: {currency: 'USD', value: '0'}
  };

  return (
    <StateProvider initialState={initialState} reducer={Reducer}>
      <div className="App" >
        <div className="Title">Currency converter</div>
        <CurrenciesPanel/>
      </div>
    </StateProvider>)
}

export default App;
