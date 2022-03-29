import React, { useState, useEffect, useContext } from 'react';

import Header from '../../components/header/Header';

import './styles/index.scss';

// import { MainContext } from '../../context/mainContext';
import { useStoreProvider } from '../../context/storeContext';
import Carousel from './components/Carousel';

function Main() {
  // const { } = useContext(MainContext);

  return (
    <>
      <Header />
      <h1>Main</h1>
      <Carousel />
    </>
  );
}

export default useStoreProvider(<Main />);
