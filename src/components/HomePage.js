import React, { useState, useEffect } from 'react';
import { Header } from './common/Header';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export const HomePage = () => {
  const [news, setNews] = useState([]);
  const apiKey = '78a9e53424ca21f7708646133d053315';

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=world&lang=en&apikey=${apiKey}`
      );
      const data = await response.json();

      const sortedArticles = data.articles.sort((a, b) => {
        const aLength = a.title.length + a.description.length;
        const bLength = b.title.length + b.description.length;
        return aLength - bLength;
      });

      const uniqueArticles = Array.from(
        new Set(sortedArticles.map((article) => article.title))
      ).map((title) =>
        sortedArticles.find((article) => article.title === title)
      );

      articles = uniqueArticles
        .filter((article) => article.image)
        .map((article) => {
          const descriptionWords = article.description.split(' ');
          const shortDescription =
            descriptionWords.length > 25
              ? descriptionWords.slice(0, 25).join(' ') + '...'
              : article.description;

          const titleWords = article.title.split(' ');
          const shortTitle =
            titleWords.length > 15
              ? titleWords.slice(0, 15).join(' ') + '...'
              : article.title;

          return (
            <Col
              key={article.url}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="d-flex align-items-stretch"
            >
              <Card className="mb-3 w-100">
                <Card.Img
                  variant="top"
                  src={article.image}
                  className="card-img-custom"
                />
                <Card.Body>
                  <Card.Title>{shortTitle}</Card.Title>
                  <Card.Text>{shortDescription}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button href={article.url}>Read More</Button>
                </Card.Footer>
              </Card>
            </Col>
          );
        });

      setNews(articles);
    };

    fetchNews();
  }, []);

  return (
    <div>
      <Container>
        <h1>Top Headlines</h1>
        <Row className="mt-3 d-flex">{news}</Row>
      </Container>
    </div>
  );
};
