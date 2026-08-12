import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import { Search, LayoutGrid, List, FileText, Quote, Eye, CheckCircle2, Tag, FileCode } from 'lucide-react';
import { PAPERS, RESEARCH_AREAS, CONTENT_STATS } from '../data/papersData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CitationDialog } from '../components/ui/CitationDialog';
import { PdfPreviewDialog } from '../components/ui/PdfPreviewDialog';
import { LatexRenderer } from '../components/ui/LatexRenderer';
import { ScholarIcon } from '../components/ui/SocialIcons';

// Magic UI Components
import { MagicCard } from '../components/magicui/MagicCard';
import { BlurFade } from '../components/magicui/BlurFade';
import { ProgressiveBlur } from '../components/magicui/ProgressiveBlur';

export function getTagSlug(tag) {
  if (!tag) return '';
  return tag.toLowerCase().trim().replace(/\s+/g, '-');
}

export function PublicationsPage() {
  const { tagParam } = useParams();
  const [searchParams] = useSearchParams();
  const initialArea = searchParams.get('area') || 'all';
  const initialTag = tagParam ? decodeURIComponent(tagParam).replace(/-/g, ' ') : (searchParams.get('tag') || '');

  const [searchQuery, setSearchQuery] = useState(initialTag ? initialTag : '');
  const [selectedArea, setSelectedArea] = useState(initialArea);
  const [selectedYear, setSelectedYear] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedPaperForCite, setSelectedPaperForCite] = useState(null);
  const [selectedPaperForPdf, setSelectedPaperForPdf] = useState(null);

  useEffect(() => {
    if (tagParam) {
      setSearchQuery(decodeURIComponent(tagParam).replace(/-/g, ' '));
    } else if (searchParams.get('tag')) {
      setSearchQuery(searchParams.get('tag'));
    }
  }, [tagParam, searchParams]);

  const availableYears = Array.from(new Set((PAPERS || []).map(p => p?.year).filter(Boolean))).sort((a, b) => b - a);

  const filteredPapers = useMemo(() => {
    return (PAPERS || []).filter(paper => {
      if (!paper) return false;
      const query = searchQuery.toLowerCase().trim();
      const matchQuery = !query ||
        (paper.title && paper.title.toLowerCase().includes(query)) ||
        (paper.abstract && paper.abstract.toLowerCase().includes(query)) ||
        (paper.authors && Array.isArray(paper.authors) && paper.authors.some(a => a && a.name && a.name.toLowerCase().includes(query))) ||
        (paper.tags && Array.isArray(paper.tags) && paper.tags.some(t => t && t.toLowerCase().includes(query)));

      const matchArea = selectedArea === 'all' || paper.areaId === selectedArea;
      const matchYear = selectedYear === 'all' || (paper.year && paper.year.toString() === selectedYear);

      return matchQuery && matchArea && matchYear;
    });
  }, [searchQuery, selectedArea, selectedYear]);

  const triggerCiteConfetti = (paper) => {
    setSelectedPaperForCite(paper);
    import('canvas-confetti').then((module) => {
      const confetti = module.default;
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-900/50 py-12 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Header */}
        <BlurFade delay={0.1}>
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
                  <FileCode className="h-3 w-3 text-indigo-600" />
                  Publications Library ({CONTENT_STATS?.totalPublicationsCount || PAPERS.length} Papers)
                </span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
                Sensifai Publications Library
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Browse, filter, and export academic references across our open research repository.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-950 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-2xs dark:shadow-none">
              <div>Total Citations: <span className="font-extrabold text-zinc-950 dark:text-zinc-50">{CONTENT_STATS?.totalCitations || 1961}</span></div>
              <div className="h-3 w-px bg-zinc-200 dark:bg-zinc-700" />
              <div>Domains: <span className="font-extrabold text-zinc-950 dark:text-zinc-50">{RESEARCH_AREAS.length}</span></div>
            </div>
          </div>
        </BlurFade>

        {/* Search & Filter Toolbar */}
        <BlurFade delay={0.2}>
          <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-4 shadow-2xs dark:shadow-none mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search publications by title, abstract keyword, author, or research tags..."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full h-5 w-5 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-800">
              {/* Dropdown Filters (Domain & Year) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                {/* Domain Select */}
                <div className="flex items-center gap-2">
                  <span className="w-14 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider shrink-0">Domain:</span>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="flex-1 sm:flex-none text-xs font-bold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer transition-colors max-w-full sm:max-w-xs truncate"
                  >
                    <option value="all">All Domains</option>
                    {RESEARCH_AREAS.map(area => (
                      <option key={area.id} value={area.id}>
                        {area.name || area.badge}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year Select */}
                <div className="flex items-center gap-2">
                  <span className="w-14 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider shrink-0">Year:</span>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="flex-1 sm:flex-none text-xs font-bold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer transition-colors"
                  >
                    <option value="all">All Years</option>
                    {availableYears.map(yr => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center justify-end gap-2 shrink-0 ml-auto pt-1 sm:pt-0">
                <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-white dark:bg-zinc-950 text-indigo-600 shadow-2xs dark:shadow-none' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400'}`}
                    title="Grid View"
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-all cursor-pointer ${viewMode === 'list' ? 'bg-white dark:bg-zinc-950 text-indigo-600 shadow-2xs dark:shadow-none' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400'}`}
                    title="List View"
                  >
                    <List className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Papers Grid/List */}
        {filteredPapers.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPapers.map((paper, index) => (
                <BlurFade key={paper.id} delay={0.05 * index}>
                  <MagicCard
                    shine={paper.featured && index === 0}
                    shineColor={["#93d500", "#6366f1", "#0284c7"]}
                    className="relative group hover:border-indigo-300"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="indigo">{paper.areaBadge || paper.areaName}</Badge>
                        {paper.isPublished && (
                          <Badge variant="published">
                            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                            {paper.publishedBadge}
                          </Badge>
                        )}
                        {paper.citations !== undefined && paper.citations !== null && (
                          <a
                            href={paper.scholarUrl || '#'}
                            target={paper.scholarUrl ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            title={`Cited by ${paper.citations} on Google Scholar`}
                            className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/80 transition-colors"
                          >
                            <ScholarIcon className="h-2.5 w-2.5 text-blue-600 dark:text-blue-400 shrink-0" />
                            <span>Cited by {paper.citations}</span>
                          </a>
                        )}
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium ml-auto">{paper.month} {paper.year}</span>
                      </div>
                      
                      <Link to={`/publication/${paper.id}`} className="hover:text-indigo-600 transition-colors">
                        <h3 className="text-base font-bold leading-snug text-zinc-950 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {paper.title}
                        </h3>
                      </Link>

                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal mt-1.5 line-clamp-1">
                        <span className="font-semibold text-zinc-400 dark:text-zinc-500">By </span>
                        {paper.authors ? paper.authors.map(a => a?.name || '').filter(Boolean).join(', ') : 'Sensifai Research'}
                      </div>

                      <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                        <LatexRenderer content={paper.abstract || ''} />
                      </div>
                      
                      {/* Linkable Tags */}
                      {paper.tags && Array.isArray(paper.tags) && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {paper.tags.map(t => (
                            <Link
                              key={t}
                              to={`/tag/${getTagSlug(t)}`}
                              className="inline-flex items-center gap-0.5 text-[10px] py-0.5 px-2 font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
                            >
                              <Tag className="h-2.5 w-2.5 text-zinc-400 dark:text-zinc-500" />
                              {t}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4 mt-6">
                      <Button variant="outline" size="sm" onClick={() => setSelectedPaperForPdf(paper)} className="h-7 px-2.5 text-xs font-bold gap-1 text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700">
                        <Eye className="h-3 w-3 text-indigo-600" />
                        Show Publication
                      </Button>

                      <Button variant="ghost" size="sm" onClick={() => triggerCiteConfetti(paper)} className="h-7 px-2 text-xs text-zinc-500 dark:text-zinc-400 gap-1 hover:text-zinc-950 dark:hover:text-zinc-50">
                        <Quote className="h-3 w-3" />
                        Cite
                      </Button>
                    </div>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPapers.map((paper, index) => (
                <BlurFade key={paper.id} delay={0.04 * index}>
                  <MagicCard
                    className="p-5 group hover:border-indigo-300"
                    contentClassName="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                  >
                    
                    {/* Left side: Content with min-w-0 flex-1 sm:pr-6 to ensure text wraps before buttons */}
                    <div className="space-y-2 min-w-0 flex-1 sm:pr-6">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <Badge variant="indigo">{paper.areaBadge || paper.areaName}</Badge>
                        <span className="font-bold text-zinc-700 dark:text-zinc-300">{paper.venue}</span>
                        <span className="text-zinc-300 dark:text-zinc-700">•</span>
                        <span className="text-zinc-500 dark:text-zinc-400 font-medium">{paper.month} {paper.year}</span>
                        {paper.citations !== undefined && paper.citations !== null && (
                          <>
                            <span className="text-zinc-300 dark:text-zinc-700">•</span>
                            <a
                              href={paper.scholarUrl || '#'}
                              target={paper.scholarUrl ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 hover:underline"
                              title={`Cited by ${paper.citations} on Google Scholar`}
                            >
                              <ScholarIcon className="h-3 w-3 text-blue-600 dark:text-blue-400 shrink-0" />
                              <span>Cited by {paper.citations}</span>
                            </a>
                          </>
                        )}
                      </div>
                      
                      <Link to={`/publication/${paper.id}`} className="font-bold text-zinc-950 dark:text-zinc-50 hover:text-indigo-600 text-base leading-snug block transition-colors">
                        {paper.title}
                      </Link>
                      
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal line-clamp-1 mt-0.5">
                        <span className="font-semibold text-zinc-400 dark:text-zinc-500">By </span>
                        {paper.authors ? paper.authors.map(a => a?.name || '').filter(Boolean).join(', ') : 'Sensifai Research'}
                      </div>

                      <div className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed pt-1">
                        <LatexRenderer content={paper.abstract || ''} />
                      </div>
                    </div>

                    {/* Right side: Vertically centered buttons stack (right center) */}
                    <div className="flex sm:flex-col items-center justify-center gap-2 shrink-0 self-start sm:self-center w-full sm:w-auto border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800 pt-3 sm:pt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedPaperForPdf(paper)}
                        className="h-8 px-3.5 text-xs font-bold gap-1.5 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 hover:border-indigo-300 text-zinc-900 dark:text-zinc-100 w-full sm:w-auto justify-center"
                      >
                        <Eye className="h-3.5 w-3.5 text-indigo-600" />
                        Show Publication
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => triggerCiteConfetti(paper)}
                        className="h-8 px-3.5 text-xs text-zinc-500 dark:text-zinc-400 gap-1.5 hover:text-zinc-950 dark:hover:text-zinc-50 w-full sm:w-auto justify-center"
                      >
                        <Quote className="h-3.5 w-3.5" />
                        Cite Paper
                      </Button>
                    </div>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-16 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xs dark:shadow-none">
            <FileText className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">No matching publications found</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
              Try adjusting your domain filter, year selection, or search query.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setSearchQuery(''); setSelectedArea('all'); setSelectedYear('all'); }}
              className="mt-4 text-xs font-bold"
            >
              Reset All Filters
            </Button>
          </div>
        )}

        {/* Citation Dialog Modal */}
        {selectedPaperForCite && (
          <CitationDialog
            paper={selectedPaperForCite}
            isOpen={!!selectedPaperForCite}
            onClose={() => setSelectedPaperForCite(null)}
          />
        )}

        {/* PDF Preview Dialog Modal */}
        {selectedPaperForPdf && (
          <PdfPreviewDialog
            paper={selectedPaperForPdf}
            isOpen={!!selectedPaperForPdf}
            onClose={() => setSelectedPaperForPdf(null)}
          />
        )}

      </div>
    </div>
  );
}
