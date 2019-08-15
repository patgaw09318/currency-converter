import React from "react";
import { useStateValue } from "../StateManager/StateContext";

const RatePanel = () => {
  const [{ rate }] = useStateValue();
  return (
    <div className="RatePanel">
      <div className="header">Rate details</div>
      <br />
      <div>Rate:</div>
      <div className="value">{rate.value}</div>
      <br />
      <div>Date:</div>
      <div className="value">{rate.date}</div>
    </div>
  );
};

export default RatePanel;
