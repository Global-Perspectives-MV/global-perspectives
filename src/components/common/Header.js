import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { useNavigate, Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';

export const Header = () => {
  const navigate = useNavigate();

  const categories = [
    'Home',
    'World',
    'Politics',
    'Economy',
    'Business',
    'Tech',
    'Science',
    'Health',
    'Sports',
    'Opinion',
    'Arts',
    'Books',
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
      <Container style={{ flexDirection: 'column' }}>
        <Navbar.Brand as={Link} to="/" className="h1">
          Global Perspectives
        </Navbar.Brand>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto links" style={{ justifyContent: 'center' }}>
              {categories.map((category, index) => (
                <Nav.Link
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
                </Nav.Link>
              ))}
            </Nav>
            <SearchBar />
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
