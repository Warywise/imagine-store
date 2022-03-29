import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { BsCart4 } from 'react-icons/bs';

import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';

import { useUserProvider } from '../context/userContext';

function Header() {
  const activeS = { color: 'red' };
  const defaultS = { color: 'black' };

  return (
    <Navbar bg="dark" expand={false} sticky='top' collapseOnSelect>
      <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Brand href="#"><h2>Imagine Store</h2></Navbar.Brand>
        <BsCart4 color='white' size={40} />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel"><h1>IS</h1></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavLink to='/' style={({ isActive }) => isActive ? activeS : defaultS}>
                <Nav.Link href='/'>
                  Home
                </Nav.Link>
              </NavLink>
              <NavLink to='/' style={({ isActive }) => isActive ? activeS : defaultS}>
                <Nav.Link href='/'>
                  Account
                </Nav.Link>
              </NavLink>
              <NavLink to='/' style={({ isActive }) => isActive ? activeS : defaultS}>
                <Nav.Link href='/'>
                  Favotites
                </Nav.Link>
              </NavLink>
              <NavDropdown title="Categories" id="offcanvasNavbarDropdown">
                <NavDropdown.Item href='/'>Category1</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default useUserProvider(<Header />);
