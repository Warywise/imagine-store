import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainContext } from './mainContext';

import { getCookie } from '../helpers/cookie';
import { fetchUserInfos } from '../helpers/axios';

import { PropChild } from '../interfaces/default';
import { Adress, Card, InfosType, Purchase } from '../interfaces/userInfos';

const INIT_USER = {
  name: '', email: '', cpf: '' || null,
};

type UserType = {
  name: string, email: string, cpf: string | null,
};

type INIT_CONTEXT = {
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>,
  user: UserType,
  adresses: Adress[],
  cards: Card[],
  purchases: Purchase[],
};

export const UserContext = createContext({} as INIT_CONTEXT);

export function UserProvider({ children }: PropChild) {
  const { active, setActive, currentUser } = useContext(MainContext);
  const [user, setUser] = useState(INIT_USER as UserType);
  const [adresses, setAdresses] = useState([] as Adress[]);
  const [cards, setCards] = useState([] as Card[]);
  const [purchases, setPurchases] = useState([] as Purchase[]);

  const navigateTo = useNavigate();

  const getUserInfos = async () => {
    const auth = getCookie('auth_handler');
    if (auth && typeof auth !== 'string') {
      const infos: InfosType = await fetchUserInfos(auth);

      if ('cpf' in infos) setUser({ ...currentUser, cpf: infos.cpf });
      if ('userAdresses' in infos) setAdresses(infos.userAdresses);
      if ('userCards' in infos) setCards(infos.userCards);
      if ('userPurchases' in infos) setPurchases(infos.userPurchases);
    }
  };

  useEffect(() => {
    if (active) {
      getUserInfos();
    } else {
      setUser(INIT_USER);
      setAdresses([]);
      setCards([]);
      setPurchases([]);
    }
  }, [active]);

  useEffect(() => {
    if (!active) navigateTo('/auth/login', { replace: true });
  }, [active]);

  const userValue = {
    active,
    setActive,
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
