import React, { useState, useEffect, useContext } from 'react';

import Header from '../../components/header/Header';
import ProductCard from './components/ProductCard';

import { StoreContext } from '../../context/storeContext';

import './styles/index.scss';

// import { MainContext } from '../../context/mainContext';
import { useStoreProvider } from '../../context/storeContext';
import Carousel from './components/Carousel';

function Main() {
  const { products } = useContext(StoreContext);

  return (
    <>
      <Header />
      <h1>Main</h1>
      <Carousel />
      <div className='main-products'>
        {products.length > 0 && products.map((prod, ind) => {
          // if (ind < 1) console.log(prod);
          return (<ProductCard key={prod.id} {...prod} />);
        })} 
      </div>
    </>
  );
}

export default useStoreProvider(<Main />);
