import React from 'react';
import { Route, Routes } from 'react-router-dom';

// import { useStoreProvider } from './context/storeContext';

import Login from './pages/login';
import Main from './pages/main';

import './styles/App.scss';
import Account from './pages/account';
import Favorites from './pages/favorites';

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={Main} />
        <Route path='auth'>
          <Route path='signin' element={<Login />} />
          {/* <Route path='signup' element={<Register />} /> */}
        </Route>
        <Route path='account' element={<Account />} />
        <Route path='favorites' element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
