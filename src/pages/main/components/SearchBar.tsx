import React, { useContext, useEffect, useState, KeyboardEvent } from 'react';
import { Button } from 'react-bootstrap';

import { StoreContext } from '../../../context/storeContext';

export default function SearchBar() {
  const { products, setQuery, setPage, query, categoryFilter } = useContext(StoreContext);

  const [search, setSearch] = useState('');
  const [notFound, setNotFound] = useState(false);

  const getProducts = (clear?: boolean) => {
    setPage(1);

    if (clear) {
      setSearch('');
      setQuery('');
      return;
    }

    setQuery(search);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === 'Enter' && search.length) {
      return getProducts();
    }
  };

  useEffect(() => {
    if (products.length && notFound) {
      setNotFound(false);
    }

    if (!products.length && search.length) {
      setNotFound(true);
    }
  }, [products]);

  return (
    <div className='main-search-bar'>
      <span className='search-input'>
        <input
          type='text'
          value={search}
          onKeyUp={handleKeyPress}
          onChange={({ target }) => setSearch(target.value)}
        />
        {search &&
          <Button
            className='search-clear'
            variant='light'
            onClick={() => getProducts(true)}
            title='clear search'
          >
            X
          </Button>}
      </span>
      <Button
        variant='outline-dark'
        disabled={!search.length}
        onClick={() => getProducts()}
      >
        Search
      </Button>
      {notFound && <p className='search-not-found text-danger'>
        There are no results for this search
      </p>}
      {(query || categoryFilter) && !notFound && <p className='search-not-found text-mutted'>
        {'Results for: '}
        {!!query && `Search > '${query}'`}
        {(query && categoryFilter) && ' | '}
        {!!categoryFilter && `Category > '${categoryFilter}'`}
      </p>}
    </div>
  );
}
