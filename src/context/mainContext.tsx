import React, {
  createContext, Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { getCookie } from '../helpers/cookie';

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
  const navigateTo = useNavigate();
  
  useEffect(() => {
    const auth = getCookie('auth_handler');
    if (auth) {
      // axiosRefreshToken(auth)
      // axiosGetUser(auth)
      // setCurrentUser(user)
      // setActive(true);
      console.log(auth);
      return navigateTo('/', { replace: true });
    }
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
