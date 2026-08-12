import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, CheckCircle2, Eye, Quote } from 'lucide-react';
import { TEAM, PAPERS } from '../data/papersData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CitationDialog } from '../components/ui/CitationDialog';
import { PdfPreviewDialog } from '../components/ui/PdfPreviewDialog';
import { GithubIcon, LinkedinIcon, ScholarIcon, OrcidIcon, TwitterIcon } from '../components/ui/SocialIcons';

// Magic UI Components
import { MagicCard } from '../components/magicui/MagicCard';
import { BlurFade } from '../components/magicui/BlurFade';
import { NumberTicker } from '../components/magicui/NumberTicker';

export function ResearcherDetailPage() {
  const { id } = useParams();

  // Find researcher by ORCID ID or fallback legacy username ID
  const researcher = (TEAM || []).find(r => 
    r && (
      r.orcidId === id || 
      r.id === id || 
      (r.orcid && typeof r.orcid === 'string' && r.orcid.includes(id)) ||
      (r.name && typeof r.name === 'string' && r.name.toLowerCase() === id?.toLowerCase())
    )
  ) || TEAM[0];

  const [selectedPaperForCite, setSelectedPaperForCite] = useState(null);
  const [selectedPaperForPdf, setSelectedPaperForPdf] = useState(null);

  // Filter publications authored by this researcher
  const authoredPublications = (PAPERS || []).filter(p =>
    p && p.authors && Array.isArray(p.authors) && p.authors.some(a => 
      a && (
        a.id === researcher?.orcidId || 
        a.id === researcher?.id || 
        (a.name && researcher?.name && typeof a.name === 'string' && typeof researcher.name === 'string' && a.name.toLowerCase() === researcher.name.toLowerCase())
      )
    )
  );

  const totalCitations = authoredPublications.reduce((sum, p) => sum + (p.citations || 0), 0);

  const triggerCiteConfetti = (paper) => {
    setSelectedPaperForCite(paper);
    import('canvas-confetti').then((module) => {
      const confetti = module.default;
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.75 }
      });
    });
  };

  if (!researcher) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Researcher Profile Not Found</h2>
          <Link to="/researchers">
            <Button variant="outline">Back to Researchers Directory</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50/30 dark:bg-zinc-900/30 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <BlurFade delay={0.05}>
          <Link to="/researchers" className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Researchers Directory
          </Link>
        </BlurFade>

        {/* Researcher Hero Profile Header Card */}
        <BlurFade delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-8 shadow-sm dark:shadow-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Avatar & Info */}
              <div className="lg:col-span-4 text-center lg:text-left space-y-3">
                <img
                  src={researcher.avatar}
                  alt={researcher.name}
                  className="h-36 w-36 rounded-full mx-auto lg:mx-0 object-cover border-4 border-zinc-950 dark:border-zinc-50 shadow-md dark:shadow-none"
                />
                <div>
                  <h1 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">{researcher.name}</h1>
                  <p className="text-xs font-bold text-indigo-600 mt-1">{researcher.role}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{researcher.affiliation}</p>
                </div>
              </div>

              {/* Bio & Key Metrics */}
              <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
                
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">Biography & Research Focus</h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    {researcher.bio}
                  </p>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center sm:text-left">
                  <div className="space-y-0.5">
                    <div className="text-2xl font-black text-zinc-950 dark:text-zinc-50">
                      <NumberTicker value={authoredPublications.length} />
                    </div>
                    <div className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Publications</div>
                  </div>

                  <div className="space-y-0.5 sm:border-l sm:border-zinc-100 sm:pl-4">
                    <div className="text-2xl font-black text-indigo-600">
                      <NumberTicker value={researcher.citations || totalCitations} />
                    </div>
                    <div className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Citations</div>
                  </div>

                  <div className="space-y-0.5 sm:border-l sm:border-zinc-100 sm:pl-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-zinc-100 dark:border-zinc-800 col-span-1">
                    <div className="text-2xl font-black text-[#5c8a00]">
                      <NumberTicker value={researcher.hIndex || 0} />
                    </div>
                    <div className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">h-index</div>
                  </div>

                  <div className="space-y-0.5 sm:border-l sm:border-zinc-100 sm:pl-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-zinc-100 dark:border-zinc-800 col-span-1">
                    <div className="text-2xl font-black text-purple-600">
                      <NumberTicker value={researcher.i10Index || 0} />
                    </div>
                    <div className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">i10-index</div>
                  </div>
                </div>

                {/* All Social & Academic Icons in 1 Uniform Row */}
                <div className="flex items-center justify-center lg:justify-start gap-2.5 pt-2">
                  {(researcher.githubUrl || researcher.github) && (
                    <a
                      href={researcher.githubUrl || researcher.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-950 dark:hover:bg-zinc-50 hover:text-white transition-all shadow-2xs dark:shadow-none"
                      title="GitHub Profile"
                    >
                      <GithubIcon className="h-4 w-4" />
                    </a>
                  )}
                  {(researcher.linkedinUrl || researcher.linkedin) && (
                    <a
                      href={researcher.linkedinUrl || researcher.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-[#0A66C2] hover:text-white transition-all shadow-2xs dark:shadow-none"
                      title="LinkedIn Profile"
                    >
                      <LinkedinIcon className="h-4 w-4" />
                    </a>
                  )}
                  {(researcher.scholarUrl || researcher.scholar) && (
                    <a
                      href={researcher.scholarUrl || researcher.scholar}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-[#4285F4] hover:text-white transition-all shadow-2xs dark:shadow-none"
                      title="Google Scholar Profile"
                    >
                      <ScholarIcon className="h-4 w-4" />
                    </a>
                  )}
                  {(researcher.orcidId || researcher.orcid) && (
                    <a
                      href={researcher.orcid ? researcher.orcid : `https://orcid.org/${researcher.orcidId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-[#A6CE39] hover:text-zinc-950 dark:hover:text-zinc-50 transition-all shadow-2xs dark:shadow-none"
                      title={`ORCID iD: ${researcher.orcidId || ''}`}
                    >
                      <OrcidIcon className="h-4 w-4" />
                    </a>
                  )}
                  {researcher.twitterUrl && (
                    <a
                      href={researcher.twitterUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-[#1DA1F2] hover:text-white transition-all shadow-2xs dark:shadow-none"
                      title="Twitter / X"
                    >
                      <TwitterIcon className="h-4 w-4" />
                    </a>
                  )}
                </div>

              </div>

            </div>
          </div>
        </BlurFade>

        {/* Authored Publications Grid */}
        <BlurFade delay={0.2}>
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 pb-4">
              <div>
                <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase">Bibliography</span>
                <h2 className="text-2xl font-extrabold text-zinc-950 dark:text-zinc-50 mt-0.5">
                  Authored Publications ({authoredPublications.length})
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {authoredPublications.map((paper, index) => (
                <BlurFade key={paper.id} delay={0.05 * index}>
                  <MagicCard className="relative group hover:border-indigo-300 flex flex-col justify-between h-full p-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge variant="indigo">{paper.areaBadge || paper.areaName}</Badge>
                        {paper.isPublished && (
                          <Badge variant="published" title={`Published in ${paper.venue}`}>
                            <CheckCircle2 className="h-3 w-3 text-emerald-600" /> {paper.publishedBadge}
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
                      </div>

                      <Link to={`/publication/${paper.id}`} className="hover:text-indigo-600 transition-colors">
                        <h3 className="text-base leading-snug font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {paper.title}
                        </h3>
                      </Link>

                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
                        By {paper.authors ? paper.authors.map(a => a?.name || '').filter(Boolean).join(', ') : 'Sensifai Labs'}
                      </div>

                      <p className="mt-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
                        {paper.abstract}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4 mt-6">
                      {paper.pdfUrl ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedPaperForPdf(paper)}
                          className="h-7 px-2.5 text-[11px] font-bold gap-1 text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700 hover:border-indigo-300"
                        >
                          <Eye className="h-3 w-3 text-indigo-600" />
                          Show Publication
                        </Button>
                      ) : paper.journalUrl ? (
                        <a href={paper.journalUrl} target="_blank" rel="noreferrer">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2.5 text-[11px] font-bold gap-1 text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700 hover:border-indigo-300"
                          >
                            <ExternalLink className="h-3 w-3 text-emerald-600" />
                            Publisher
                          </Button>
                        </a>
                      ) : (
                        <div></div>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => triggerCiteConfetti(paper)}
                        className="h-7 px-2 text-[11px] text-zinc-500 dark:text-zinc-400 gap-1 hover:text-zinc-900 dark:hover:text-zinc-100"
                      >
                        <Quote className="h-3 w-3" />
                        Cite
                      </Button>
                    </div>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>

          </div>
        </BlurFade>

      </div>

      {/* Citation Dialog Modal */}
      <CitationDialog
        paper={selectedPaperForCite}
        isOpen={!!selectedPaperForCite}
        onClose={() => setSelectedPaperForCite(null)}
      />

      {/* PDF Preview Modal */}
      <PdfPreviewDialog
        paper={selectedPaperForPdf}
        isOpen={!!selectedPaperForPdf}
        onClose={() => setSelectedPaperForPdf(null)}
      />

    </div>
  );
}
