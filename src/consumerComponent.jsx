import React, { useContext } from "react";
import { DataContext } from "./dataCotext";
const ConsumerComponent = () => {
  const receivedMessage = useContext(DataContext);
  
  return (
    <div className="container">
      <h2>The Consumer Component</h2>
      <strong>The Received message: {receivedMessage}</strong>
    </div>
  );
};

export default ConsumerComponent;
