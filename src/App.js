import React, { useState } from 'react';
import { ErrorProvider } from './components/common/ErrorContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { News } from './components/News';
import { NotFound } from './pages/NotFound';

export function App() {
  const [hasError, setHasError] = React.useState(false);

  return (
    <div>
      <ErrorProvider value={{ hasError, setHasError }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ErrorProvider>
    </div>
  );
}
