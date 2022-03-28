import React, { createContext, useEffect, useState } from 'react';
import { axiosGetter } from '../helpers/axios';

import { PropChild } from '../interfaces/default';
import { CategoryType, ProductType } from '../interfaces/store';

export const StoreContext = createContext({});

export function StoreProvider({ children }: PropChild) {
  const [categories, setCategories] = useState([] as CategoryType[]);
  const [products, setProducts] = useState([] as ProductType[]);

  const getCategories = async () => {
    const categoriesResult: CategoryType[] = await axiosGetter('/categories');
    if (Array.isArray(categoriesResult)) {
      setCategories(categoriesResult);
    }
  };

  const getProducts = async () => {
    const productsResult: ProductType[] = await axiosGetter('/products');
    if (Array.isArray(productsResult)) {
      setProducts(productsResult);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
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
