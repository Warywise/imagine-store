import React, { createContext, useEffect, useState } from 'react';
import { axiosGetter } from '../helpers/axios';

import { PropChild } from '../interfaces/default';

type INITIAL_VALUE = Record<string, unknown>[];

export const StoreContext = createContext({});

export function StoreProvider({ children }: PropChild) {
  const [products, setProducts] = useState([] as INITIAL_VALUE);
  const [categories, setCategories] = useState([] as INITIAL_VALUE);

  const getCategories = async () => {
    const categoriesResult = await axiosGetter('/categories');
    if (Array.isArray(categoriesResult)) {
      setCategories(categoriesResult);
    }
  };

  const getProducts = async () => {
    //
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    // getProducts();
  }, []);

  const storeValue = {
    products,
    categories,
  };

  return (
    <StoreContext.Provider value={storeValue}>
      { children }
    </StoreContext.Provider>
  );
}

export function useStoreProvider(children: JSX.Element) {
  return (
    <StoreProvider>
      { children }
    </StoreProvider>
  );
}
