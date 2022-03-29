import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/header/Header';
import { MainContext } from '../../context/mainContext';

export default function Favorites() {
  const { active } = useContext(MainContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!active) navigateTo('/auth/signin', { replace: true });
  }, [active]);

  return (
    <div>
      <Header />
      <h1>Favorites Page</h1>
    </div>
  );
}
