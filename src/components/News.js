import React, { useState, useEffect, useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import { ErrorContext } from './common/ErrorContext';
import { useLocation } from 'react-router-dom';
import { Header } from './common/Header';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Footer } from './common/Footer';
import { timeSince } from './common/timeSinceUtility';
import { BsClock } from 'react-icons/bs';

export const News = () => {
  const [news, setNews] = useState([]);
  const { hasError, setHasError } = useContext(ErrorContext);
  const location = useLocation();
  const category = new URLSearchParams(location.search).get('category');
  const apiKey = '78a9e53424ca21f7708646133d053315';
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://gnews.io/api/v4/search?q=${category}&lang=en&apikey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

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

        const articles = uniqueArticles
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

            const publishedAt = timeSince(article.publishedAt); // Format the date in a more friendly way

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
                    <Button href={article.url} className="btn-block">
                      Read More
                    </Button>
                    <Card.Text className="text-muted publishedTime">
                      <BsClock /> {publishedAt}
                    </Card.Text>
                  </Card.Footer>
                </Card>
              </Col>
            );
          });

        setNews(articles);
      } catch (hasError) {
        console.log(hasError);
        setHasError(true);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div>
      <Header />

      <Container>
        <h1>{categoryName}</h1>
        {hasError ? (
          <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              Currently we're having issues loading in the latest news
              articles... We'll be back up in a jiffy!
            </p>
          </Alert>
        ) : (
          <Row className="mt-3 d-flex">{news}</Row>
        )}
      </Container>

      <Footer />
    </div>
  );
};
``;
