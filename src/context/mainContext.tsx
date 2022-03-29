import React, {
  createContext, Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { axiosGetter, axiosGetUser, axiosRefreshToken } from '../helpers/axios';
import { destroyCookie, getCookie, setCookie } from '../helpers/cookie';

import { PropChild } from '../interfaces/default';
import { CategoryType } from '../interfaces/store';

type InitialContext = {
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>,
  currentUser: typeof INIT_USER,
  setCurrentUser: Dispatch<SetStateAction<typeof INIT_USER>>,
  categories: CategoryType[],
  categoryFilter: string,
  setCategoryFilter: Dispatch<SetStateAction<string>>,
}

const INIT_USER = {
  name: '',
  email: '',
};

export const MainContext = createContext({} as InitialContext);

export function MainProvider({ children }: PropChild) {
  const [active, setActive] = useState(false);
  const [currentUser, setCurrentUser] = useState(INIT_USER);
  const [categories, setCategories] = useState([] as CategoryType[]);
  const [categoryFilter, setCategoryFilter] = useState('');

  const navigateTo = useNavigate();
  const TEN_MINUTES = 1000 * 60 * 10;

  const getCategories = async () => {
    const categoriesResult: CategoryType[] = await axiosGetter('/categories');
    if (Array.isArray(categoriesResult)) {
      setCategories(categoriesResult);
    }
  };

  const getUserData = async () => {
    const auth = getCookie('auth_handler');
    if (auth && typeof auth !== 'string') return await axiosGetUser(auth);
    return null;
  };

  const refreshToken = async () => {
    const auth = getCookie('auth_handler');
    if (auth && typeof auth !== 'string') {
      if (currentUser.email !== auth.email) {
        destroyCookie('auth_handler');
        return setActive(false);
      }

      const userData = await axiosRefreshToken(auth);
      if (userData?.active) {
        const { email, name, token } = userData;
        setCookie('auth_handler', token);
        return setCurrentUser({ email, name });
      }

      destroyCookie('auth_handler');
      return setActive(false);
    }
  };

  const refreshTokenInterval = () => {
    setTimeout(async () => {
      await refreshToken();
      if (active) refreshTokenInterval();
    }, TEN_MINUTES);
  };

  const verifyToken = async () => {
    const userResult = await getUserData();
    if (userResult?.active) {
      const { email, name } = userResult;
      setCurrentUser({ email, name });
      setActive(true);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    if (active) {
      refreshTokenInterval();
    } else {
      setCurrentUser(INIT_USER);
      navigateTo('/', { replace: true });
    }
  }, [active]);

  useEffect(() => {
    getCategories();
  }, []);

  const contextValue = {
    active,
    setActive,
    currentUser,
    setCurrentUser,
    categories,
    categoryFilter,
    setCategoryFilter,
  };

  return (
    <MainContext.Provider value={contextValue}>
      {children}
    </MainContext.Provider>
  );
}
