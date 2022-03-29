import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/header/Header';
import { MainContext } from '../../context/mainContext';

export default function Account() {
  const { active } = useContext(MainContext);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!active) navigateTo('/auth/login', { replace: true });
  }, [active]);

  return (
    <div>
      <Header />
      <h1>Account Page</h1>
    </div>
  );
}
