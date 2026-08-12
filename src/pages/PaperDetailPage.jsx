import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, Download, Quote, Copy, Check, Share2, Mail, CheckCircle2, ExternalLink, ZoomIn, X } from 'lucide-react';
import { TwitterIcon, LinkedinIcon, FacebookIcon, GithubIcon, ScholarIcon } from '../components/ui/SocialIcons';
import { PAPERS, TEAM } from '../data/papersData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CitationDialog } from '../components/ui/CitationDialog';
import { PdfPreviewDialog } from '../components/ui/PdfPreviewDialog';
import { LatexRenderer } from '../components/ui/LatexRenderer';

// Magic UI Components
import { BlurFade } from '../components/magicui/BlurFade';

export function PaperDetailPage() {
  const { id } = useParams();
  const paper = PAPERS.find(p => p.id === id || p.id?.toString() === id?.toString()) || PAPERS[0];

  const [copiedBib, setCopiedBib] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isCitationOpen, setIsCitationOpen] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [activeFigure, setActiveFigure] = useState(null);

  const handleCopyBib = () => {
    navigator.clipboard.writeText(paper.bibtex);
    setCopiedBib(true);
    setTimeout(() => setCopiedBib(false), 2000);
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const currentUrl = window.location.href;
  const shareTitle = encodeURIComponent(`Check out "${paper.title}" from Sensifai Research Labs`);
  const twitterShare = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(currentUrl)}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const mailShare = `mailto:?subject=${shareTitle}&body=${encodeURIComponent(currentUrl)}`;

  const openLightbox = (fig) => {
    setActiveFigure(fig);
  };

  return (
    <div className="min-h-screen bg-zinc-50/30 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <BlurFade delay={0.05}>
          <Link to="/publications" className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Publications
          </Link>
        </BlurFade>

        {/* Paper Header Metadata & Links */}
        <BlurFade delay={0.1}>
          <div className="space-y-6 pb-8 border-b border-zinc-200/80">
            
            {/* Badges & Year */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="indigo">{paper.areaBadge || paper.areaName}</Badge>
              {paper.isPublished && (
                <Badge variant="published">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  Published in {paper.venue}
                </Badge>
              )}
              <span className="text-xs font-bold text-zinc-400 ml-auto">{paper.month} {paper.year}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
              {paper.title}
            </h1>

            {/* Tags directly under Title (No "Linkable Tags:" label) */}
            <div className="flex flex-wrap items-center gap-2">
              {paper.tags.map(t => (
                <Link key={t} to={`/tag/${encodeURIComponent(t.toLowerCase().trim().replace(/\s+/g, '-'))}`}>
                  <Badge variant="secondary" className="text-xs font-bold hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer">
                    {t}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Authors */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Authors:</span>
              <div className="flex flex-wrap items-center gap-3">
                {paper.authors.map((author, index) => {
                  const matchingTeamMember = TEAM.find(t =>
                    t.id === author.id ||
                    t.orcidId === author.id ||
                    (t.name && author.name && t.name.toLowerCase() === author.name.toLowerCase())
                  );

                  const isExplicitExternal = author.is_external === true || author.is_external === 'true' || author.isExternal === true || author.isExternal === 'true';
                  const isInternal = matchingTeamMember && !isExplicitExternal;

                  return (
                    <div key={index} className="flex items-center gap-1.5 text-sm font-semibold text-zinc-900">
                      {isInternal ? (
                        <Link
                          to={`/researcher/${matchingTeamMember.orcidId || matchingTeamMember.id}`}
                          className="hover:text-indigo-600 transition-colors underline decoration-zinc-300 underline-offset-4"
                        >
                          {author.name}
                        </Link>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          {author.orcid ? (
                            <a
                              href={author.orcid}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-indigo-600 transition-colors underline decoration-zinc-300 underline-offset-4"
                            >
                              {author.name}
                            </a>
                          ) : (
                            <span>{author.name}</span>
                          )}
                          {author.affiliation && (
                            <span className="text-xs font-normal text-zinc-500">({author.affiliation})</span>
                          )}
                        </span>
                      )}

                      {author.isLead && (
                        <span className="rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 px-2 py-0.5 text-[9px] font-bold">
                          Lead Author
                        </span>
                      )}
                      {index < paper.authors.length - 1 && <span className="text-zinc-300 ml-1">•</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-4 w-full">
              {paper.pdfUrl && (
                <>
                  <Button size="lg" onClick={() => setIsPdfOpen(true)} className="w-full sm:w-auto justify-center gap-2 rounded-full bg-zinc-950 text-white font-bold text-xs shadow-md">
                    <Eye className="h-4 w-4 text-[#93d500]" />
                    View Full Publication PDF
                  </Button>
                  <a href={paper.pdfUrl} download target="_blank" rel="noreferrer" className="w-full sm:w-auto block">
                    <Button variant="outline" size="lg" className="w-full justify-center gap-2 rounded-full border-zinc-300 text-zinc-800 font-bold text-xs bg-white shadow-2xs">
                      <Download className="h-4 w-4 text-indigo-600" />
                      Download
                    </Button>
                  </a>
                </>
              )}

              {paper.codeUrl && (
                <a href={paper.codeUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto block">
                  <Button variant="outline" size="lg" className="w-full justify-center gap-2 rounded-full border-zinc-300 text-zinc-800 font-bold text-xs bg-white shadow-2xs">
                    <GithubIcon className="h-4 w-4 text-zinc-950" />
                    Code & Models
                  </Button>
                </a>
              )}

              {paper.journalUrl && (
                <a href={paper.journalUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto block">
                  <Button variant="outline" size="lg" className="w-full justify-center gap-2 rounded-full border-zinc-300 text-zinc-800 font-bold text-xs bg-white shadow-2xs">
                    <ExternalLink className="h-4 w-4 text-emerald-600" />
                    Publisher Page
                  </Button>
                </a>
              )}

              {paper.scholarUrl && (
                <a href={paper.scholarUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto block">
                  <Button variant="outline" size="lg" className="w-full justify-center gap-2 rounded-full border-zinc-300 text-zinc-800 font-bold text-xs bg-white shadow-2xs">
                    <ScholarIcon className="h-4 w-4 text-blue-600" />
                    Google Scholar
                  </Button>
                </a>
              )}

              <Button variant="secondary" size="lg" onClick={() => setIsCitationOpen(true)} className="w-full sm:w-auto justify-center gap-2 sm:ml-auto rounded-full font-bold text-xs bg-zinc-200/80 hover:bg-zinc-200">
                <Quote className="h-4 w-4 text-zinc-700" />
                Cite Publication
              </Button>
            </div>

            {/* Social Sharing */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-200/60 text-xs text-zinc-500">
              <span className="font-bold text-zinc-700 flex items-center gap-1.5">
                <Share2 className="h-4 w-4 text-indigo-600" /> Share Publication:
              </span>

              <div className="flex items-center gap-2">
                <a href={twitterShare} target="_blank" rel="noreferrer" className="p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 transition-colors shadow-2xs" title="Share on X (Twitter)">
                  <TwitterIcon className="h-4 w-4 text-zinc-800" />
                </a>
                <a href={linkedinShare} target="_blank" rel="noreferrer" className="p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 transition-colors shadow-2xs" title="Share on LinkedIn">
                  <LinkedinIcon className="h-4 w-4 text-blue-600" />
                </a>
                <a href={facebookShare} target="_blank" rel="noreferrer" className="p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 transition-colors shadow-2xs" title="Share on Facebook">
                  <FacebookIcon className="h-4 w-4 text-blue-700" />
                </a>
                <a href={mailShare} className="p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 transition-colors shadow-2xs" title="Share via Email">
                  <Mail className="h-4 w-4 text-zinc-700" />
                </a>
                <button onClick={handleCopyShareLink} className="p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 transition-colors shadow-2xs cursor-pointer" title="Copy Direct Link">
                  {copiedLink ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-zinc-700" />}
                </button>
              </div>
            </div>

          </div>
        </BlurFade>

        {/* Abstract & Overview Section */}
        <BlurFade delay={0.2}>
          <div className="space-y-4 pt-6 border-t border-zinc-200/80">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Abstract & Overview</h2>
            
            <LatexRenderer
              content={paper.abstract}
              className="text-base sm:text-lg text-zinc-800 leading-relaxed font-normal"
            />

            {paper.latexMathSample && (
              <div className="mt-4 p-4 rounded-xl border border-indigo-100 bg-indigo-50/40">
                <LatexRenderer
                  content={paper.latexMathSample}
                  className="text-base text-zinc-900 leading-relaxed font-normal"
                />
              </div>
            )}
          </div>
        </BlurFade>

        {/* Figures Gallery with BlurFade & Click-to-Zoom Lightbox */}
        {paper.figures && paper.figures.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-zinc-200/80">
            <BlurFade delay={0.25}>
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600">Methodology & Figure Gallery ({paper.figures.length})</h2>
                <span className="text-xs text-zinc-400 font-medium">(Click figure to zoom)</span>
              </div>
            </BlurFade>

            <div className="grid gap-6 sm:grid-cols-2">
              {paper.figures.map((fig, idx) => (
                <BlurFade key={idx} delay={0.1 * idx}>
                  <div
                    onClick={() => openLightbox(fig)}
                    className="group relative rounded-xl border border-zinc-200 overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all cursor-pointer h-full flex flex-col justify-between"
                  >
                    <div className="relative overflow-hidden bg-zinc-100">
                      <img
                        src={fig.url}
                        alt={fig.caption}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-zinc-950 shadow-md backdrop-blur-xs">
                          <ZoomIn className="h-4 w-4 text-indigo-600" /> Click to Zoom
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-3.5 text-xs text-zinc-800 font-medium border-t border-zinc-100 bg-white">
                      {fig.title && <div className="font-bold text-zinc-950 mb-1">{fig.title}</div>}
                      {fig.caption}
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        )}

        {/* BibTeX Box */}
        <BlurFade delay={0.4}>
          <div className="space-y-3 pt-6 border-t border-zinc-200/80">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600">BibTeX Citation</h2>
              <Button variant="outline" size="sm" onClick={handleCopyBib} className="h-7 px-3 text-xs gap-1 rounded-full font-bold bg-white">
                {copiedBib ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                {copiedBib ? 'Copied' : 'Copy'}
              </Button>
            </div>
            <pre className="rounded-xl bg-zinc-950 p-5 font-mono text-xs text-zinc-200 overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {paper.bibtex}
            </pre>
          </div>
        </BlurFade>

        {/* Citation Dialog Modal */}
        <CitationDialog
          paper={paper}
          isOpen={isCitationOpen}
          onClose={() => setIsCitationOpen(false)}
        />

        {/* PDF Preview Modal */}
        <PdfPreviewDialog
          paper={paper}
          isOpen={isPdfOpen}
          onClose={() => setIsPdfOpen(false)}
        />

        {/* Fullscreen Figure Lightbox Modal */}
        {activeFigure && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
              <button
                onClick={() => setActiveFigure(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="p-2 bg-zinc-950 flex justify-center">
                <img
                  src={activeFigure.url}
                  alt={activeFigure.caption}
                  className="max-h-[75vh] w-auto object-contain rounded-lg"
                />
              </div>

              <div className="p-6 bg-white border-t border-zinc-100">
                {activeFigure.title && (
                  <h4 className="text-base font-extrabold text-zinc-950 mb-1">{activeFigure.title}</h4>
                )}
                <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                  {activeFigure.caption}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
