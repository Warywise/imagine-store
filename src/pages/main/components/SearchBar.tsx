import React, { useContext, useEffect, useState, KeyboardEvent } from 'react';
import { Button } from 'react-bootstrap';

import { StoreContext } from '../../../context/storeContext';
import { axiosGetter } from '../../../helpers/axios';
import { CategoryType, ProductType } from '../../../interfaces/store';

export default function SearchBar() {
  const { categories, products, setProducts } = useContext(StoreContext);

  const [query, setQuery] = useState('');
  const [notFound, setNotFound] = useState(false);

  const getCategory = (products: ProductType[]) => {
    return products.map((prod) => {
      const { name } = categories.find(({ id }) => prod.categoryId === id) as CategoryType;
      prod.category = { name };
      return prod;
    });
  };

  const getProducts = async () => {
    const productsResponse = await axiosGetter(`/products/query?name=${query}`);
    if (productsResponse.length < 1) {
      setNotFound(true);
    } else {
      const productsResult = getCategory(productsResponse);
      setProducts(productsResult);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === 'Enter' && query.length > 2) {
      return getProducts();
    }
  };

  useEffect(() => {
    if (products.length > 0 && notFound) {
      setQuery('');
      setNotFound(false);
    }
  }, [products]);

  return (
    <div className='main-search-bar'>
      <input
        type='text'
        value={query}
        onKeyUp={handleKeyPress}
        onChange={({target}) => setQuery(target.value)}
      />
      <Button variant='outline-dark' disabled={query.length < 3} onClick={getProducts}>
        Search
      </Button>
      {notFound && <p className='search-not-found text-danger'>
        There are no results for this search
      </p>}
    </div>
  );
}
