import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userRoute, setUserRoute] = useState(JSON.parse(localStorage.getItem('userRoute')));
  const setRoute = (routeNo) => {
    setUserRoute(routeNo);
  };

  return (
    <UserContext.Provider value={{ userRoute, setRoute }}>
      {children}
    </UserContext.Provider>
  );
};