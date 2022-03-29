import React from 'react';
import { Route, Routes } from 'react-router-dom';

// import { useStoreProvider } from './context/storeContext';

import Login from './pages/login';
import Main from './pages/main';
import Header from './components/header/Header';

import './App.scss';

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <>
            {Header}
            {Main}
          </>
        } />
        <Route path='auth'>
          <Route path='signin' element={<Login />} />
          {/* <Route path='signup' element={<Register />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
