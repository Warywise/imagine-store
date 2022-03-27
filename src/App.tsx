import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import logo from './logo.svg';
import './App.scss';
import Login from './pages/login';
import { MainContext } from './context/mainContext';

function App(): JSX.Element {
  const { currentUser: user } = useContext(MainContext);
  console.log(navigator);
  return (
    <div className="App">
      <Routes>
        <Route index element={
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              { `Email: ${user.email}` }
            </p>
            <p>
              { `Name: ${user.name}` }
            </p>
            <p>
              
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
        Learn React</a>
          </header>
        } />
        <Route path='login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
