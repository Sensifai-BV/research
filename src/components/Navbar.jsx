import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Menu, X, Command, Layers, User, FileText } from 'lucide-react';
import { Button } from './ui/Button';
import { GithubIcon, LinkedinIcon, ZenodoIcon } from './ui/SocialIcons';
import { PAPERS, TEAM, searchPublications } from '../data/papersData';
import sensifaiLogo from '../assets/sensifai-logo.png';
import { AnimatedThemeToggler } from './ui/AnimatedThemeToggler';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cmdKOpen, setCmdKOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdKOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCmdKOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredPapers = searchQuery.trim()
    ? searchPublications(searchQuery)
    : PAPERS.slice(0, 3);

  const filteredAuthors = searchQuery.trim()
    ? TEAM.filter(a => {
        const q = searchQuery.toLowerCase().trim();
        return (
          (a.name && a.name.toLowerCase().includes(q)) ||
          (a.role && a.role.toLowerCase().includes(q)) ||
          (a.affiliation && a.affiliation.toLowerCase().includes(q)) ||
          (a.area && a.area.toLowerCase().includes(q)) ||
          (a.bio && a.bio.toLowerCase().includes(q))
        );
      })
    : TEAM.slice(0, 3);

  const handleSelectPaper = (paperId) => {
    setCmdKOpen(false);
    setSearchQuery('');
    navigate(`/publication/${paperId}`);
  };

  const handleSelectAuthor = (authorId, orcidId) => {
    setCmdKOpen(false);
    setSearchQuery('');
    navigate(`/researcher/${orcidId || authorId}`);
  };

  const navItems = [
    { label: 'Overview', path: '/' },
    { label: 'Publications', path: '/publications' },
    { label: 'Researchers', path: '/researchers' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          
          {/* Sensifai Labs Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={sensifaiLogo}
              alt="Sensifai Labs Logo"
              width="150"
              height="32"
              decoding="async"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="font-extrabold text-base tracking-tight text-zinc-950 dark:text-zinc-50 transition-colors">
              Sensifai <span className="font-black text-[#93d500]">Labs</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  isActive(item.path)
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-2xs dark:shadow-none'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions: Cmd+K Search trigger & Social Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <AnimatedThemeToggler />

            <button
              onClick={() => setCmdKOpen(true)}
              className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all cursor-pointer shadow-2xs dark:shadow-none"
            >
              <Search className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
              <span className="hidden sm:inline font-medium">Search publications & authors</span>
              <span className="sm:hidden font-medium">Search</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-1.5 py-0.5 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                ⌘K
              </kbd>
            </button>

            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-700 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-1">
              <a
                href="https://github.com/Sensifai-BV"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
                aria-label="Sensifai GitHub"
                title="Sensifai GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/17888541/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-[#0A66C2] transition-colors"
                aria-label="Sensifai LinkedIn"
                title="Sensifai LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="https://zenodo.org/communities/sensifai-bv"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-[#15B3E6] transition-colors"
                aria-label="Sensifai Zenodo Community"
                title="Sensifai Zenodo Community"
              >
                <ZenodoIcon className="h-4 w-4" />
              </a>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-sm font-semibold ${
                  isActive(item.path) ? 'text-zinc-950 dark:text-zinc-50 font-bold border-l-2 border-[#93d500] pl-2' : 'text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); setCmdKOpen(true); }}
              className="flex w-full items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300"
            >
              <Search className="h-4 w-4" />
              Search publications & authors (Cmd + K)
            </button>
          </div>
        )}
      </header>

      {/* Global Cmd+K Command Palette Modal */}
      {cmdKOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-xs pt-20 px-4 animate-in fade-in duration-150 cursor-pointer"
          onClick={() => setCmdKOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl dark:shadow-none overflow-hidden cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-4 border-b border-zinc-100 dark:border-zinc-800">
              <Search className="h-4 w-4 text-zinc-400 dark:text-zinc-500 mr-2 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search publications, researchers, topics..."
                className="w-full py-3.5 text-sm text-zinc-950 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400 mr-2 cursor-pointer"
                >
                  Clear
                </button>
              )}
              <kbd className="rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-1.5 py-0.5 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">ESC</kbd>
            </div>

            <div className="max-h-96 overflow-y-auto p-2 space-y-4">
              
              {/* Authors / Researchers Section */}
              {filteredAuthors.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 px-3 py-1 flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Researchers ({filteredAuthors.length})
                  </div>
                  {filteredAuthors.map((author) => (
                    <div
                      key={author.id}
                      onClick={() => handleSelectAuthor(author.id, author.orcidId)}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        {author.avatar ? (
                          <img src={author.avatar} alt={author.name} width="32" height="32" loading="lazy" decoding="async" className="h-8 w-8 rounded-full object-cover border border-zinc-200 dark:border-zinc-800" />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                            {author.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="text-xs font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{author.name}</div>
                          <div className="text-[11px] text-zinc-500 dark:text-zinc-400">{author.role || author.affiliation}</div>
                        </div>
                      </div>
                      <span className="text-[10px] rounded-full bg-indigo-50 text-indigo-700 px-2 py-0.5 font-semibold">
                        {author.area || 'Researcher'}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Publications Section */}
              {filteredPapers.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-3 py-1 flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    Publications ({filteredPapers.length})
                  </div>
                  {filteredPapers.map((paper) => (
                    <div
                      key={paper.id}
                      onClick={() => handleSelectPaper(paper.id)}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer transition-colors group"
                    >
                      <div className="pr-4">
                        <div className="text-xs font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">{paper.title}</div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400">{paper.venue} ({paper.year})</div>
                      </div>
                      <span className="text-[10px] rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 font-medium text-zinc-700 dark:text-zinc-300 shrink-0">
                        {paper.areaBadge || paper.areaName}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* No results empty state */}
              {filteredPapers.length === 0 && filteredAuthors.length === 0 && (
                <div className="text-center py-8 text-xs text-zinc-500 dark:text-zinc-400">
                  No matching publications or researchers found for "<span className="font-semibold text-zinc-900 dark:text-zinc-100">{searchQuery}</span>"
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
