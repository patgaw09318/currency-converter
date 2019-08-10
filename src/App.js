import React from "react";
import CurrenciesPanel from "./components/CurrenciesPanel";

function App() {
  return <div className="App" >
    <div className="Title">Currency converter</div>
    <CurrenciesPanel id="from"></CurrenciesPanel>
    <CurrenciesPanel id="to"></CurrenciesPanel>
  </div>;
}

export default App;
