import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { fetcherGet } from '../helpers/axios';

import { anyType, PropChild } from '../interfaces/default';
import { CategoryType, ProductType } from '../interfaces/store';
import { MainContext } from './mainContext';

type StoreType = {
  products: ProductType[],
  setProducts: Dispatch<SetStateAction<ProductType[]>>,
  categories: CategoryType[],
  categoryFilter: string,
  query: string,
  setQuery: Dispatch<SetStateAction<string>>,
  setPage: Dispatch<SetStateAction<number>>,
  sort: string,
  setSort: Dispatch<SetStateAction<string>>,
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
  const [sort, setSort] = useState('{ "name": "asc" }');

  const limit = 20;

  const getProducts = async () => {
    const skip = (page - 1) * limit;
    const orderBy = JSON.parse(sort);
    const filter = { take: 20, skip, orderBy } as { [key: string]: anyType };
    if (query) {
      filter.name = query;
    }
    if (categoryFilter) {
      filter.category = categoryFilter;
    }

    const result = await fetcherGet('/products/query', filter) as { products?: ProductType[], total: number };

    setProducts(result.products || []);
    setTotal(result.total || 0);
  };

  useEffect(() => {
    getProducts();
  }, [page, query, categoryFilter, sort]);

  const storeValue = {
    products,
    setProducts,
    query,
    setQuery,
    categories,
    categoryFilter,
    setPage,
    sort,
    setSort,
    total,
    limit,
  };

  return (
    <StoreContext.Provider value={storeValue}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreProvider(children: JSX.Element) {
  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  );
}
