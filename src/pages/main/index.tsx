import React, { useState, useEffect, useContext } from 'react';

import { MainContext } from '../../context/mainContext';
import { useStoreProvider } from '../../context/storeContext';

function Main() {
  const { currentUser: user } = useContext(MainContext);

  return (
    <>
      <h1>Main</h1>
      <p>
        { `Email: ${user.email}` }
      </p>
      <p>
        { `Name: ${user.name}` }
      </p>
    </>
  );
}

export default useStoreProvider(<Main />);
