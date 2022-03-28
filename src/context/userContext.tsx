import React, { createContext } from 'react';

import { PropChild } from '../interfaces/default';

export const UserContext = createContext({});

export function UserProvider({ children }: PropChild) {
  return (
    <UserContext.Provider value={{}}>
      { children }
    </UserContext.Provider>
  );
}

export function useUserProvider({ children }: PropChild) {
  return (
    <UserProvider>
      { children }
    </UserProvider>
  );
}
