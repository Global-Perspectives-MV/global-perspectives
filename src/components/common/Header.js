import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { useNavigate, Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';

export const Header = () => {
  const navigate = useNavigate();

  const categories = [
    'Home',
    'Technology',
    'Science',
    'Business',
    'Entertainment',
  ];

  const handleNavItemClick = (category) => {
    const categoryLowercase = category.toLowerCase();

    if (categoryLowercase === 'home') {
      navigate('/');
    } else {
      navigate(`/news?category=${categoryLowercase}`);
    }
  };

  return (
    <Navbar sticky="top" bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Global Perspectives
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Categories" id="nav-dropdown">
              {categories.map((category, index) => (
                <NavDropdown.Item
                  key={index}
                  onClick={() => handleNavItemClick(category)}
                  as={Link}
                  to={
                    category.toLowerCase() === 'home'
                      ? '/'
                      : `/news?category=${category.toLowerCase()}`
                  }
                >
                  {category}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <SearchBar />
      </Container>
    </Navbar>
  );
};

export default Header;
