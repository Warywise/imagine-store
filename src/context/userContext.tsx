import React, { createContext, useContext, useState, useEffect } from 'react';

import { MainContext } from './mainContext';

import { destroyCookie, getCookie, setCookie } from '../helpers/cookie';
import { axiosGetUserInfos } from '../helpers/axios';
import { decrypt, encrypt } from '../helpers/crypto';

import { PropChild } from '../interfaces/default';
import { Adress, Card, InfosType, Purchase } from '../interfaces/userInfos';
import { ProductType } from '../interfaces/store';

export const UserContext = createContext({});

export function UserProvider({ children }: PropChild) {
  const { active, setActive, currentUser } = useContext(MainContext);
  const [user, setUser] = useState({});
  const [adresses, setAdresses] = useState([] as Adress[]);
  const [cards, setCards] = useState([] as Card[]);
  const [purchases, setPurchases] = useState([] as Purchase[]);
  const [cart, setCart] = useState([] as ProductType[]);
  const [favorites, setFavorites] = useState([] as ProductType[]);

  const getUserInfos = async () => {
    const auth = getCookie('auth_handler');
    if (auth && typeof auth !== 'string') {
      const infos: InfosType = await axiosGetUserInfos(auth);

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
      setUser({});
      setAdresses([]);
      setCards([]);
      setPurchases([]);
    }
  }, [active]);

  useEffect(() => {
    if (active) {
      const cartCookie = getCookie('cart_backup');
      const favoritesCookie = getCookie('user_favorites');

      if (typeof cartCookie === 'string') {
        const cookieValue = decrypt(cartCookie);
        setCart(cookieValue);
      }
      if (typeof favoritesCookie === 'string') {
        const cookieValue = decrypt(favoritesCookie);
        setFavorites(cookieValue);
      }

    } else {
      destroyCookie('cart_backup');
      destroyCookie('user_favorites');
    }

  }, [active]);

  useEffect(() => {
    setCookie('cart_backup', encrypt(cart));
  }, [cart]);

  useEffect(() => {
    setCookie('user_favorites', encrypt(favorites));
  }, [favorites]);

  const userValue = {
    active,
    setActive,
    user,
    adresses,
    cards,
    purchases,
    cart,
    setCart,
    favorites,
    setFavorites,
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
