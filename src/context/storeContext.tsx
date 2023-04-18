import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { axiosGetter } from '../helpers/axios';

import { anyType, PropChild } from '../interfaces/default';
import { CategoryType, ProductType } from '../interfaces/store';
import { MainContext } from './mainContext';

type StoreType = {
  products: ProductType[],
  setProducts: Dispatch<SetStateAction<ProductType[]>>,
  categories: CategoryType[],
  query: string,
  setQuery: Dispatch<SetStateAction<string>>,
  setPage: Dispatch<SetStateAction<number>>,
  total: number,
  limit: number,
};

export const StoreContext = createContext({} as StoreType);

export function StoreProvider({ children }: PropChild) {
  const { categories, categoryFilter } = useContext(MainContext);

  const [products, setProducts] = useState([] as ProductType[]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const limit = 20;

  const getProducts = async () => {
    const skip = (page - 1) * limit;
    const filter = { take: 20, skip, orderBy: { name: 'asc' } } as { [key: string]: anyType };
    if (query) {
      filter.name = query;
    }

    const result = await axiosGetter('/products/query', filter) as { products?: ProductType[], total: number };
    if (result.products) {
      setProducts(result.products);
      setTotal(result.total);
    }
  };

  useEffect(() => {
    getProducts();
  }, [page, query]);

  useEffect(() => {
    // if (allProducts.length > 0) {
    //   if (categoryFilter === '') {
    //     setProducts(allProducts);
    //   } else {
    //     const productsToRender = allProducts
    //       .filter(({ category }) => category.name.includes(categoryFilter));
    //     setProducts(productsToRender);
    //   }
    // }
  }, [categoryFilter]);

  const storeValue = {
    products,
    setProducts,
    query,
    setQuery,
    categories,
    setPage,
    total,
    limit,
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
