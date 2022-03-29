import React, { useContext } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

import { StoreContext } from '../context/storeContext';
import { useStoreProvider } from '../context/storeContext';

function CategoriesDropdown() {
  const { categories } = useContext(StoreContext);

  return (
    <NavDropdown title="Categories">
      <NavLink to='/'>
        <NavDropdown.Item href='/'>Category1</NavDropdown.Item>
      </NavLink>
    </NavDropdown>
  );
}

export default useStoreProvider(<CategoriesDropdown />);
