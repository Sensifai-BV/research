import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PublicationsPage } from './pages/PublicationsPage';
import { PaperDetailPage } from './pages/PaperDetailPage';
import { PeoplePage } from './pages/PeoplePage';
import { ResearcherDetailPage } from './pages/ResearcherDetailPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col font-sans antialiased text-zinc-900 bg-zinc-50/50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/tag/:tagParam" element={<PublicationsPage />} />
            <Route path="/tags/:tagParam" element={<PublicationsPage />} />
            <Route path="/publications/tag/:tagParam" element={<PublicationsPage />} />
            <Route path="/publication/:id" element={<PaperDetailPage />} />
            <Route path="/paper/:id" element={<PaperDetailPage />} />
            <Route path="/researchers" element={<PeoplePage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/researcher/:id" element={<ResearcherDetailPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
