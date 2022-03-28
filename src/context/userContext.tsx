import React, { createContext, useContext, useState, useEffect } from 'react';

import { MainContext } from './mainContext';

import { getCookie } from '../helpers/cookie';
import { axiosGetUserInfos } from '../helpers/axios';

import { PropChild } from '../interfaces/default';
import { InfosType } from '../interfaces/userInfos';

export const UserContext = createContext({});

export function UserProvider({ children }: PropChild) {
  const { active, setActive, currentUser } = useContext(MainContext);
  const [user, setUser] = useState({});
  const [adresses, setAdresses] = useState([] as any[]);
  const [cards, setCards] = useState([] as any[]);
  const [purchases, setPurchases] = useState([] as any[]);

  const getUserInfos = async () => {
    const auth = getCookie('auth_handler');
    if (auth) {
      const infos: InfosType = await axiosGetUserInfos(auth);

      if ('cpf' in infos) setUser({ ...currentUser, cpf: infos.cpf });
      if ('userAdresses' in infos) setAdresses(infos.userAdresses);
      if ('userCards' in infos) setCards(infos.userCards);
      if ('userPurchases' in infos) setPurchases(infos.userPurchases);
    }
  };

  useEffect(() => {
    getUserInfos();
  }, []);

  const userValue = {
    active,
    user,
    adresses,
    cards,
    purchases,
  };

  return (
    <UserContext.Provider value={userValue}>
      { children }
    </UserContext.Provider>
  );
}

export function useUserProvider(children: JSX.Element) {
  return (
    <UserProvider>
      { children }
    </UserProvider>
  );
}
