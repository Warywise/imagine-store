import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import CategoriesDropdown from './CategoriesDropdown';
import CartButton from './CartButton';
import ISdark from '../../ISdark.png';
import ISlight from '../../ISlight.png';

import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { HiOutlineMenu } from 'react-icons/hi';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';

import { useUserProvider } from '../../context/userContext';

function Header() {
  const activeS = { fontWeight: '500', textDecoration: 'underline' };
  const defaultS = { textDecoration: 'none' };

  return (
    <Navbar bg="dark" expand={false} sticky='top' collapseOnSelect className='nav-bar'>
      <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar" className='nav-toggle border-light'>
          <HiOutlineMenu className='nav-toggle-icon'/>
        </Navbar.Toggle>
        <Navbar.Brand>
          <Link to='/'>
            <img src={ISdark} className='header-pic' alt='imagine store' />
          </Link>
        </Navbar.Brand>
        <CartButton />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <img src={ISlight} alt='imagine store' />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="offcanvas-nav justify-content-end flex-grow-1 pe-3">
              <NavLink to='/' style={({ isActive }) => isActive ? activeS : defaultS}>
                <Nav.Link href='/' className='cat-nav-item'>
                  Home
                </Nav.Link>
              </NavLink>
              <NavLink to='/account' style={({ isActive }) => isActive ? activeS : defaultS}>
                <Nav.Link href='/' className='cat-nav-item'>
                  Account
                </Nav.Link>
              </NavLink>
              <NavLink to='/favorites' style={({ isActive }) => isActive ? activeS : defaultS}>
                <Nav.Link href='/' className='cat-nav-item'>
                  Favotites
                </Nav.Link>
              </NavLink>
              <CategoriesDropdown />
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default useUserProvider(<Header />);
