import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Header from '../components/common/Header';
import { HomePage } from '../components/HomePage';
import { Footer } from '../components/common/Footer';

export const Home = () => {
  return (
    <div datatest-id="app">
      {/* header componenet */}
      <Header />

      {/* container for introduction card */}
      <Container className="mt-3 mb-3">
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header as="h5">
                Welcome to the Global Perspectives
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  Experience global news like never before at Global
                  Perspectives, your trusted source for diverse insights. With
                  expert journalists covering politics, business, and culture,
                  broaden your horizons and deepen your understanding of our
                  interconnected world. Stay informed, gain perspective, and
                  explore the stories that shape our global community.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/*  */}
      <HomePage />

      <Footer />
    </div>
  );
};
