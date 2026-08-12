import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

const HomePage = React.lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const PublicationsPage = React.lazy(() => import('./pages/PublicationsPage').then(module => ({ default: module.PublicationsPage })));
const PaperDetailPage = React.lazy(() => import('./pages/PaperDetailPage').then(module => ({ default: module.PaperDetailPage })));
const PeoplePage = React.lazy(() => import('./pages/PeoplePage').then(module => ({ default: module.PeoplePage })));
const ResearcherDetailPage = React.lazy(() => import('./pages/ResearcherDetailPage').then(module => ({ default: module.ResearcherDetailPage })));

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
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-zinc-500">Loading...</div>}>
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
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
