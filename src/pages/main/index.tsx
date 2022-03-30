import React, { useState, useEffect, useContext } from 'react';

import Header from '../../components/header/Header';
import ProductCard from './components/ProductCard';

import { StoreContext } from '../../context/storeContext';

import './styles/index.scss';

// import { MainContext } from '../../context/mainContext';
import { useStoreProvider } from '../../context/storeContext';
import Carousel from './components/Carousel';
import SearchBar from './components/SearchBar';
import { Outlet } from 'react-router-dom';

function Main() {
  const { products } = useContext(StoreContext);

  return (
    <>
      <Header />
      <Carousel />
      <SearchBar />
      <Outlet />
      <div className='main-products'>
        {products.length > 0 && products.map((prod) => {
          return (<ProductCard key={prod.id} {...prod} />);
        })} 
      </div>
    </>
  );
}

export default useStoreProvider(<Main />);
