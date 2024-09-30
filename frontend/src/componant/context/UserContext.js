import React, { createContext, useContext, useReducer, useEffect } from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {

  return (
    <UserContext.Provider >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);