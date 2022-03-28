import React, { createContext } from 'react';

import { PropChild } from '../interfaces/default';

export const StoreContext = createContext({});

export function StoreProvider({ children }: PropChild) {
  return (
    <StoreContext.Provider value={{}}>
      { children }
    </StoreContext.Provider>
  );
}

export function useStoreProvider({ children }: PropChild) {
  return (
    <StoreProvider>
      { children }
    </StoreProvider>
  );
}
