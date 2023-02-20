import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function NotAuthNavbar () {
  return (
    <>
    <Navbar className="nav-bg-color" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">BANK</Navbar.Brand>
      </Container>
    </Navbar>
    </>
  );
}

export default NotAuthNavbar ;