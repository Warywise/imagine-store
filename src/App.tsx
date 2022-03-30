import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Main from './pages/main';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import Favorites from './pages/favorites';
import ProductDetail from './components/ProductDetail';

import './styles/App.scss';
import AccountRoute from './routers/account';

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path='auth'>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>
        <Route path='account' element={<AccountRoute />}>
          {/* <Route path='shop' element={<Shop />} /> */}
        </Route>
        <Route path='favorites' element={<Favorites />}>
          <Route path='/favorites/:id' element={<ProductDetail />}/>
        </Route>
        <Route path='/' element={Main}>
          <Route path='/:id' element={<ProductDetail />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
