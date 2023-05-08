/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { DataContext } from "./dataCotext";
import Login from "./routes/Login";
const ProviderComponent = () => {
  const [appState, setAppState] = useState({
    JWTToken: '', 
    isAdmin: '', 
    isAuthenticated: ''
  });


  return (
      <DataContext.Provider value={{appState, setAppState}}>
       <Login></Login>
      </DataContext.Provider>
  );
};

export default ProviderComponent;
