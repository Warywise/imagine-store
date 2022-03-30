import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from '../context/userContext';
import Account from '../pages/account';
import Shop from '../pages/account/shop';

export default function AccountRoute() {
  return (
    <UserProvider>
      <Routes>
        <Route index element={<Account />} />
        <Route path='shop' element={<Shop />} />
      </Routes>
    </UserProvider>
  );
}
