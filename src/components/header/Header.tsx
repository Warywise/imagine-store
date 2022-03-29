import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { BsCart4 } from 'react-icons/bs';
import { HiOutlineMenu } from 'react-icons/hi';

import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';

import CategoriesDropdown from './CategoriesDropdown';
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
        <Navbar.Brand href="#"><h2>Imagine Store</h2></Navbar.Brand>
        <BsCart4 color='white' size={35} />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel"><h1>IS</h1></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="cat-nav justify-content-end flex-grow-1 pe-3">
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
