import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { axiosGetter } from '../helpers/axios';

import { PropChild } from '../interfaces/default';
import { CategoryType, ProductType } from '../interfaces/store';
import { MainContext } from './mainContext';

type StoreType = {
  products: ProductType[],
};

export const StoreContext = createContext({} as StoreType);

export function StoreProvider({ children }: PropChild) {
  const { categoryFilter } = useContext(MainContext);

  const [allProducts, setAllProducts] = useState([] as ProductType[]);
  const [products, setProducts] = useState([] as ProductType[]);

  const getProducts = async () => {
    const productsResult: ProductType[] = await axiosGetter('/products');
    if (Array.isArray(productsResult)) {
      setAllProducts(productsResult);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      if (categoryFilter === '') {
        setProducts(allProducts);
      } else {
        const productsToRender = allProducts
          .filter(({ category }) => category.name.includes(categoryFilter));
        setProducts(productsToRender);
      }
    }
  }, [allProducts, categoryFilter]);

  const storeValue = {
    products,
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
