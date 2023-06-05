import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ErrorProvider,
  ErrorConsumer,
  ErrorContext,
} from './components/common/ErrorContext';
import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { SearchBar } from './components/common/SearchBar';
import { NotFound } from './pages/NotFound';
import { News } from './components/News';

describe('Component Tests', () => {
  test('renders NotFound component', () => {
    render(<NotFound />);
    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /We're sorry, but the page you were looking for doesn't exist./i
      )
    ).toBeInTheDocument();
  });

  test('fetches and displays news', async () => {
    render(
      <ErrorProvider value={{ hasError: false, setHasError: jest.fn() }}>
        <Router>
          <News />
        </Router>
      </ErrorProvider>
    );

    // Mock the API response
    const mockArticles = [
      {
        title: 'Article 1',
        description: 'Description 1',
        url: 'https://example.com/article1',
      },
      {
        title: 'Article 2',
        description: 'Description 2',
        url: 'https://example.com/article2',
      },
    ];
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ articles: mockArticles }),
    });

    expect(await screen.findByText(/Article 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
  });

  test('renders Footer component', () => {
    render(<Footer />);

    expect(screen.getByText(/Global Perspectives/i)).toBeInTheDocument();
    expect(screen.getByText(/© \d{4} Copyright/i)).toBeInTheDocument();
  });

  test('renders Header component', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    expect(screen.getByText(/Global Perspectives/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/World/i)).toBeInTheDocument();
    // ...test for other navigation links
  });

  test('renders SearchBar component', () => {
    render(
      <Router>
        <SearchBar />
      </Router>
    );

    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });

  test('handles search input', () => {
    render(
      <Router>
        <SearchBar />
      </Router>
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'news' } });
    fireEvent.keyPress(searchInput, { key: 'Enter', code: 13, charCode: 13 });

    // Assert the search functionality (e.g., navigate to the correct page)
  });
});
