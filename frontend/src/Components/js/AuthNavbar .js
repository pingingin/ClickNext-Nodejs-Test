import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

function AuthNavbar () {
  return (
    <>
    <Navbar className="nav-bg-color" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">BANK</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/deposit">Deposit</Nav.Link>
            <Nav.Link href="/withdraw">Withdraw</Nav.Link>
            <Nav.Link href="/transfer">Transfer</Nav.Link>
            <NavDropdown title="History" id="basic-nav-dropdown">
              <NavDropdown.Item href="/history/transfer">Transfer</NavDropdown.Item>
              <NavDropdown.Item href="/history/receive">Receive</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button href="/logout" variant="outline-warning">Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default AuthNavbar ;