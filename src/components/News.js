import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './common/Header';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export const News = () => {
  const [news, setNews] = useState([]);
  const location = useLocation();
  const category = new URLSearchParams(location.search).get('category');
  const apiKey = '78a9e53424ca21f7708646133d053315';
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  useEffect(() => {
    const fetchNews = async () => {
      let articles = JSON.parse(localStorage.getItem(category));
      const lastFetchTime = localStorage.getItem(`${category}_timestamp`);

      const currentDate = new Date();
      const currentDay = currentDate.getDate();

      if (lastFetchTime) {
        const fetchDate = new Date(parseInt(lastFetchTime));
        const fetchDay = fetchDate.getDate();

        if (fetchDay === currentDay && articles) {
          setNews(articles);
          return;
        }
      }

      const response = await fetch(
        `https://gnews.io/api/v4/search?q=${category}&lang=en&apikey=${apiKey}`
      );
      const data = await response.json();

      const sortedArticles = data.articles.sort((a, b) => {
        const aLength = a.title.length + a.description.length;
        const bLength = b.title.length + b.description.length;
        return aLength - bLength;
      });

      articles = sortedArticles
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
              md={3}
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

      localStorage.setItem(category, JSON.stringify(articles));
      localStorage.setItem(
        `${category}_timestamp`,
        currentDate.getTime().toString()
      );

      setNews(articles);
    };

    fetchNews();
  }, [category]);

  return (
    <div>
      <Header />

      <Container>
        <h1>{categoryName}</h1>
        <Row className="mt-3 d-flex">{news}</Row>
      </Container>
    </div>
  );
};
