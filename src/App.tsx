import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Main from './pages/main';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import Account from './pages/account';
import Favorites from './pages/favorites';

import './styles/App.scss';

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={Main} />
        <Route path='auth'>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>
        <Route path='account' element={<Account />} />
        <Route path='favorites' element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
