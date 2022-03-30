import React, { useContext } from 'react';

import Header from '../../components/header/Header';
import ProductCard from '../../components/ProductCard';

import { StoreContext } from '../../context/storeContext';

import './styles/index.scss';

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
      <section className='main-products'>
        {products.length > 0 && products.map((prod) => {
          return (<ProductCard key={prod.id} {...prod} />);
        })} 
      </section>
    </>
  );
}

export default useStoreProvider(<Main />);
