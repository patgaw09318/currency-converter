import React from "react";
import CurrenciesPanel from "./components/CurrenciesPanel";
import { StateProvider } from "./StateManager/StateContext";
import Reducer from "./StateManager/Reducer";
import "./components/Styles.css";

const App = () => {
  const initialState = {
    primary: { currency: "EUR", value: "10" },
    secondary: { currency: "USD", value: "0" },
    rate: { value: 0, date: "" }
  };

  return (
    <StateProvider initialState={initialState} reducer={Reducer}>
      <div className="App">
        <div className="Title">Currency converter</div>
        <CurrenciesPanel />
        <footer>
          <div>@2019 Patryk Gawryszewski</div>
          <div>
            <a href="https://exchangeratesapi.io" target="_blank">
              Rates source
            </a>
          </div>
        </footer>
      </div>
    </StateProvider>
  );
};

export default App;
