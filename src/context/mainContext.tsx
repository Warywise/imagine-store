import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PropChild } from '../interfaces/default';

type InitialContext = {
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>,
  currentUser: InitialUser,
  setCurrentUser: Dispatch<SetStateAction<InitialUser>>
}

type InitialUser = {
  name: string,
  email: string,
};

export const MainContext = createContext({} as InitialContext);

export function MainProvider({ children }: PropChild) {
  const [active, setActive] = useState(false);
  const [currentUser, setCurrentUser] = useState({} as InitialUser);

  useEffect(() => {
    // const auth = getCookie('ayth_handler');
  }, []);
  

  const contextValue = {
    active,
    setActive,
    currentUser,
    setCurrentUser
  };

  return (
    <MainContext.Provider value={contextValue}>
      {children}
    </MainContext.Provider>
  );
}
