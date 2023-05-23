import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: '100vh' }}
    >
      <Row className="text-center">
        <Col>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>We're sorry, but the page you were looking for doesn't exist.</p>
          <Button variant="primary" as={Link} to="/">
            Go Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
