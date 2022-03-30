import React, { useContext, useEffect } from 'react';

import Header from '../../components/header/Header';
import { MainContext } from '../../context/mainContext';
import ProductCard from '../main/components/ProductCard';

import './styles/index.scss';

export default function Favorites() {
  const { favorites } = useContext(MainContext);

  return (
    <div>
      <Header />
      <h2>My Favorites</h2>
      <section className='favorites-products'>
        {favorites.length > 0 && favorites.map((prod) =>
          <ProductCard key={prod.id} {...prod} />)}
      </section>
    </div>
  );
}
