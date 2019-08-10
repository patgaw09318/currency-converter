import React from "react";
import CurrenciesPanel from "./components/CurrenciesPanel";

const onChange = (id)=>{
  console.log(id);
};

function App() {
  return <div className="App" >
    <div className="Title">Currency converter</div>
    <CurrenciesPanel id="from" onChange={onChange}></CurrenciesPanel>
    <CurrenciesPanel id="to" onChange={onChange}></CurrenciesPanel>
  </div>;
}

export default App;
