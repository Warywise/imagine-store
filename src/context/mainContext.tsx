import React, {
  createContext, Dispatch, SetStateAction, useEffect, useState,
} from 'react';
// import { useNavigate } from 'react-router-dom';

import { axiosGetUser, axiosRefreshToken } from '../helpers/axios';
import { destroyCookie, getCookie, setCookie } from '../helpers/cookie';

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
  const [currentUser, setCurrentUser] = useState({ email: '', name: '' });
  // const navigateTo = useNavigate();
  const TEN_MINUTES = 1000 * 60 * 10;

  const getUserData = async () => {
    const auth = getCookie('auth_handler');
    if (auth)  return await axiosGetUser(auth);
    return null;
  };

  const refreshToken = async () => {
    const auth = getCookie('auth_handler');
    if (auth) {
      if (currentUser.email !== auth.email) {
        destroyCookie('auth_handler');
        return setActive(false);
      }

      const userData = await axiosRefreshToken(auth);
      if (userData.active) {
        const { email, name, token } = userData;
        setCookie('auth_handler', token);
        return setCurrentUser({ email, name });
      }

      destroyCookie('auth_handler');
      return setActive(false);
    }
  };

  const refreshTokenInterval = () => {
    if (active) {
      setTimeout(async () => {
        await refreshToken();
        refreshTokenInterval();
      }, TEN_MINUTES);
    }
  };

  const verifyToken = async () => {
    const userResult = await getUserData();
    if (userResult.active) {
      const { email, name } = userResult;
      setCurrentUser({ email, name });
      setActive(true);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    refreshTokenInterval();
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
