import React, { useContext } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

import { MainContext } from '../context/mainContext';

export default function CategoriesDropdown() {
  const { categories, setCategoryFilter } = useContext(MainContext);

  const getNavItems = () => {
    return categories.map(({ id, name }) => (
      <NavLink key={`${id}${name}`} to='/'>
        <NavDropdown.Item
          href='/'
          onClick={() => setCategoryFilter(name)}
        >
          {name}
        </NavDropdown.Item>
      </NavLink>
    ));
  };

  return (
    <NavDropdown title="Categories" className='cat-nav-item'>
      <NavLink to='/'>
        <NavDropdown.Item onClick={() => setCategoryFilter('')} href='/'>
        All
        </NavDropdown.Item>
      </NavLink>
      <NavDropdown.Divider />
      { categories.length > 0 && getNavItems() }
    </NavDropdown>
  );
}
