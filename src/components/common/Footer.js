import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

export const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" className="navbar-margin">
      <Container fluid className="justify-content-center">
        <Navbar.Brand href="/">Global Perspectives</Navbar.Brand>
        <Navbar.Text>&copy; {new Date().getFullYear()} Copyright</Navbar.Text>
      </Container>
    </Navbar>
  );
};
