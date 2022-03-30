import React, { useContext, useEffect } from 'react';

import Header from '../../components/header/Header';
import { MainContext } from '../../context/mainContext';

export default function Favorites() {
  const { favorites } = useContext(MainContext);

  return (
    <div>
      <Header />
      <h1>Favorites Page</h1>
    </div>
  );
}
