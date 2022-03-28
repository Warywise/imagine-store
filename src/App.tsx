import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './pages/login';
import { MainContext } from './context/mainContext';

import './App.scss';

function App(): JSX.Element {
  const { currentUser: user } = useContext(MainContext);
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <header className="App-header">
            <p>
              { `Email: ${user.email}` }
            </p>
            <p>
              { `Name: ${user.name}` }
            </p>
          </header>
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
