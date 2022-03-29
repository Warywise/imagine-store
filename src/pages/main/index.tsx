import React, { useState, useEffect, useContext } from 'react';

import Header from '../../components/header/Header';

// import { MainContext } from '../../context/mainContext';
import { useStoreProvider } from '../../context/storeContext';

function Main() {
  // const { } = useContext(MainContext);

  return (
    <>
      <Header />
      <h1>Main</h1>
    </>
  );
}

export default useStoreProvider(<Main />);
