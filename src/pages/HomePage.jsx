import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Quote, CheckCircle2, ExternalLink } from 'lucide-react';
import { PAPERS, TEAM, CONTENT_STATS } from '../data/papersData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CitationDialog } from '../components/ui/CitationDialog';
import { PdfPreviewDialog } from '../components/ui/PdfPreviewDialog';
import { HeroVisualizer } from '../components/HeroVisualizer';
import { GithubIcon, LinkedinIcon, ScholarIcon, OrcidIcon } from '../components/ui/SocialIcons';
import { SmartCarousel } from '../components/ui/SmartCarousel';
import { ScrollToTop } from '../components/ui/ScrollToTop';

// Magic UI Components
import { Particles } from '../components/magicui/Particles';
import { NumberTicker } from '../components/magicui/NumberTicker';
import { ShimmerButton } from '../components/magicui/ShimmerButton';
import { MagicCard } from '../components/magicui/MagicCard';
import { AvatarCircles } from '../components/magicui/AvatarCircles';
import { BlurFade } from '../components/magicui/BlurFade';
import { SparklesText } from '../components/magicui/SparklesText';
import { TypingAnimation } from '../components/magicui/TypingAnimation';

export function HomePage() {
  const [selectedPaperForCite, setSelectedPaperForCite] = useState(null);
  const [selectedPaperForPdf, setSelectedPaperForPdf] = useState(null);

  // Top 5 Latest Publications sorted by year/recency
  const latestFivePapers = [...(PAPERS || [])]
    .sort((a, b) => (b.year || 0) - (a.year || 0))
    .slice(0, 5);

  // Top 5 Researchers sorted by publication count
  const sortedResearchers = [...(TEAM || [])].map(r => {
    const pubCount = (PAPERS || []).filter(p =>
      p && p.authors && Array.isArray(p.authors) && p.authors.some(a =>
        a && (a.id === r.orcidId || a.id === r.id || (a.name && r.name && a.name.toLowerCase() === r.name.toLowerCase()))
      )
    ).length;
    return { ...r, pubCount };
  }).sort((a, b) => b.pubCount - a.pubCount);

  const topFiveResearchers = sortedResearchers.slice(0, 5);

  const teamAvatars = topFiveResearchers.map(m => ({
    name: m.name,
    imageUrl: m.avatar,
    profileUrl: `/researcher/${m.orcidId || m.id}`
  }));

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

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-900/50">
      
      {/* Magic UI Hero Section */}
      <section className="relative border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 py-14 lg:py-20 overflow-hidden">
        {/* Magic UI Particles background */}
        <Particles className="hidden lg:block absolute inset-0 z-0 opacity-60" quantity={65} color="#6366f1" size={0.7} />
        
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Headline, Actions & Metrics */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Sparkles Headline */}
              <BlurFade delay={0.15}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.1] text-center lg:text-left">
                  <SparklesText text="Sensifai Research Labs" colors={{ first: "#93d500", second: "#6366f1" }} className="inline-block" />
                </h1>
              </BlurFade>

              {/* Typing Animation Subhead */}
              <BlurFade delay={0.2}>
                <div className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
                  <TypingAnimation
                    text="Our mission is to drive breakthroughs in multimodal AI that benefit society, industry, and Sensifai products."
                    duration={20}
                  />
                </div>
              </BlurFade>

              {/* Call to Actions */}
              <BlurFade delay={0.25}>
                <div className="pt-2 flex flex-wrap justify-center lg:justify-start items-center gap-4">
                  <Link to="/publications">
                    <ShimmerButton className="font-extrabold text-xs px-6 py-3 shadow-md dark:shadow-none">
                      Explore {CONTENT_STATS?.totalPublicationsCount || PAPERS.length} Publications Library &rarr;
                    </ShimmerButton>
                  </Link>
                  
                  <Link to="/researchers">
                    <Button variant="outline" className="font-bold text-xs px-5 py-2.5">
                      Meet Researchers
                    </Button>
                  </Link>
                </div>
              </BlurFade>

              {/* Metrics Stats Grid directly under Call to Actions */}
              <BlurFade delay={0.3}>
                <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-zinc-100/80 dark:border-zinc-800/80 mt-6 text-center lg:text-left">
                  
                  <div className="space-y-0.5">
                    <div className="text-xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 flex justify-center lg:justify-start items-center gap-0.5">
                      <NumberTicker value={CONTENT_STATS?.totalPublicationsCount || 6} className="text-zinc-950 dark:text-zinc-50" />
                      <span>+</span>
                    </div>
                    <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Publications</div>
                  </div>

                  <div className="space-y-0.5 sm:border-l sm:border-zinc-200/60 sm:pl-3">
                    <div className="text-xl font-black tracking-tight text-indigo-600 flex justify-center lg:justify-start items-center gap-0.5">
                      <NumberTicker value={CONTENT_STATS?.totalCitations || 1961} className="text-indigo-600" />
                      <span>+</span>
                    </div>
                    <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Total Citations</div>
                  </div>

                  <div className="space-y-0.5 sm:border-l sm:border-zinc-200/60 sm:pl-3">
                    <div className="text-xl font-black tracking-tight text-emerald-600 flex justify-center lg:justify-start items-center">
                      <NumberTicker value={CONTENT_STATS?.averageCitationsPerPaper || 327} className="text-emerald-600" />
                    </div>
                    <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Avg Citations</div>
                  </div>

                  <div className="space-y-0.5 sm:border-l sm:border-zinc-200/60 sm:pl-3">
                    <div className="text-xl font-black tracking-tight text-sky-600 flex justify-center lg:justify-start items-center">
                      <NumberTicker value={CONTENT_STATS?.totalResearchAreasCount || 5} className="text-sky-600" />
                    </div>
                    <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider whitespace-nowrap">Domains</div>
                  </div>

                </div>
              </BlurFade>

            </div>

            {/* Right Column: Hero Visualizer */}
            <div className="hidden lg:block lg:col-span-5">
              <BlurFade delay={0.35}>
                <HeroVisualizer />
              </BlurFade>
            </div>

          </div>

        </div>
      </section>

      {/* 5 Latest Research Publications Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase">Latest Research</span>
              <h2 className="text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 mt-0.5">5 Recent Publications</h2>
            </div>
            
            <Link to="/publications" className="group text-xs font-bold text-white dark:text-zinc-900 bg-zinc-950 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 px-4 py-2 rounded-full flex items-center gap-1.5 transition-all shadow-sm dark:shadow-none">
              View Full Library <ArrowRight className="h-3.5 w-3.5 text-[#93d500] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Responsive Layout with Smart Carousel */}
          <div className="space-y-8">
            
            {/* Top 1 Latest Featured Paper */}
            {latestFivePapers.length > 0 && (() => {
              const featuredPaper = latestFivePapers[0];
              return (
                <BlurFade delay={0.08}>
                  <MagicCard
                    shine={true}
                    shineColor={["#93d500", "#6366f1", "#0284c7"]}
                    className="relative group hover:border-indigo-400 p-5 sm:p-8 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2.5 sm:mb-3">
                        <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-extrabold text-[11px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                          ⭐ Featured Research
                        </span>
                        <Badge variant="indigo" className="text-xs px-2.5 py-0.5 sm:py-1 font-semibold">{featuredPaper.areaBadge || featuredPaper.areaName}</Badge>
                        {featuredPaper.isPublished && (
                          <Badge variant="published" className="text-xs px-2 py-0.5 sm:py-1 font-semibold" title={`Published in ${featuredPaper.venue}`}>
                            <CheckCircle2 className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-emerald-600" /> {featuredPaper.year} {featuredPaper.venue ? <span className="hidden sm:inline">• {featuredPaper.venue}</span> : ''}
                          </Badge>
                        )}
                        {featuredPaper.citations !== undefined && featuredPaper.citations !== null && (
                          <a
                            href={featuredPaper.scholarUrl || '#'}
                            target={featuredPaper.scholarUrl ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            title={`Cited by ${featuredPaper.citations} on Google Scholar`}
                            className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-xs font-extrabold text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/80 transition-colors"
                          >
                            <ScholarIcon className="h-2.5 sm:h-3 w-2.5 sm:w-3 text-blue-600 dark:text-blue-400 shrink-0" />
                            <span>{featuredPaper.citations} <span className="hidden sm:inline">Citations</span></span>
                          </a>
                        )}
                      </div>

                      <Link to={`/publication/${featuredPaper.id}`} className="block group-hover:text-indigo-600 transition-colors">
                        <h3 className="text-base sm:text-xl lg:text-2xl font-bold sm:font-black text-zinc-950 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2 sm:line-clamp-none">
                          {featuredPaper.title}
                        </h3>
                      </Link>

                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1.5 font-normal line-clamp-1">
                        <span className="font-semibold text-zinc-400 dark:text-zinc-500">By </span>
                        {featuredPaper.authors ? featuredPaper.authors.map(a => a?.name || '').filter(Boolean).join(', ') : 'Sensifai Labs'}
                      </div>

                      <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 line-clamp-3 sm:line-clamp-4">
                        {featuredPaper.abstract}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between gap-2 border-t border-zinc-100 dark:border-zinc-800/80 pt-3.5 sm:pt-4 mt-5 sm:mt-6">
                      <div className="flex items-center gap-2">
                        {featuredPaper.pdfUrl ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedPaperForPdf(featuredPaper)}
                            className="h-7.5 sm:h-8 px-3 sm:px-3.5 text-xs font-bold gap-1 sm:gap-1.5 text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700 hover:border-indigo-400"
                          >
                            <Eye className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-indigo-600" />
                            Show PDF
                          </Button>
                        ) : featuredPaper.journalUrl ? (
                          <a href={featuredPaper.journalUrl} target="_blank" rel="noreferrer">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7.5 sm:h-8 px-3 sm:px-3.5 text-xs font-bold gap-1 sm:gap-1.5 text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700 hover:border-indigo-400"
                            >
                              <ExternalLink className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-emerald-600" />
                              Publisher
                            </Button>
                          </a>
                        ) : null}

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => triggerCiteConfetti(featuredPaper)}
                          className="h-7.5 sm:h-8 px-2.5 sm:px-3 text-xs font-bold text-zinc-500 dark:text-zinc-400 gap-1 sm:gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100"
                        >
                          <Quote className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                          Cite
                        </Button>
                      </div>

                      <Link to={`/publication/${featuredPaper.id}`}>
                        <Button variant="outline" size="sm" className="h-7.5 sm:h-8 px-3 sm:px-3.5 text-xs font-bold gap-1 sm:gap-1.5 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40">
                          Details <ArrowRight className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </MagicCard>
                </BlurFade>
              );
            })()}

            {/* Smart Scroll Carousel for Remaining Recent Papers */}
            <SmartCarousel
              showControls={true}
              showIndicators={true}
              badge="More Recent Work"
              title=""
              itemClassName="w-[88vw] sm:w-[420px] md:w-[480px]"
            >
              {latestFivePapers.slice(1).map((paper, index) => (
                <BlurFade key={paper.id} delay={0.1 * (index + 1)} className="h-full">
                  <MagicCard
                    shine={false}
                    className="relative group hover:border-indigo-300 flex flex-col justify-between h-full p-5 sm:p-6"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2.5">
                        <Badge variant="indigo" className="text-xs px-2.5 py-0.5 font-semibold">{paper.areaBadge || paper.areaName}</Badge>
                        {paper.isPublished && (
                          <Badge variant="published" className="text-xs px-2 py-0.5 font-semibold" title={`Published in ${paper.venue}`}>
                            <CheckCircle2 className="h-3 w-3 text-emerald-600" /> {paper.year}
                          </Badge>
                        )}
                        {paper.citations !== undefined && paper.citations !== null && (
                          <a
                            href={paper.scholarUrl || '#'}
                            target={paper.scholarUrl ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            title={`Cited by ${paper.citations} on Google Scholar`}
                            className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 px-2 py-0.5 text-[11px] font-extrabold text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/80 transition-colors"
                          >
                            <ScholarIcon className="h-2.5 w-2.5 text-blue-600 dark:text-blue-400 shrink-0" />
                            <span>{paper.citations}</span>
                          </a>
                        )}
                      </div>

                      <Link to={`/publication/${paper.id}`} className="hover:text-indigo-600 transition-colors">
                        <h3 className="text-base sm:text-lg leading-snug font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                          {paper.title}
                        </h3>
                      </Link>

                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1.5 font-normal line-clamp-1">
                        <span className="font-semibold text-zinc-400 dark:text-zinc-500">By </span>
                        {paper.authors ? paper.authors.map(a => a?.name || '').filter(Boolean).join(', ') : 'Sensifai Labs'}
                      </div>

                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
                        {paper.abstract}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between gap-2 border-t border-zinc-100 dark:border-zinc-800/80 pt-3.5 mt-5">
                      <div className="flex items-center gap-2">
                        {paper.pdfUrl ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedPaperForPdf(paper)}
                            className="h-7.5 px-3 text-xs font-bold gap-1 text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700 hover:border-indigo-300"
                          >
                            <Eye className="h-3 w-3 text-indigo-600" />
                            Show PDF
                          </Button>
                        ) : paper.journalUrl ? (
                          <a href={paper.journalUrl} target="_blank" rel="noreferrer">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7.5 px-3 text-xs font-bold gap-1 text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700 hover:border-indigo-300"
                            >
                              <ExternalLink className="h-3 w-3 text-emerald-600" />
                              Publisher
                            </Button>
                          </a>
                        ) : null}

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => triggerCiteConfetti(paper)}
                          className="h-7.5 px-2.5 text-xs text-zinc-500 dark:text-zinc-400 gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 font-semibold"
                        >
                          <Quote className="h-3 w-3" />
                          Cite
                        </Button>
                      </div>

                      <Link to={`/publication/${paper.id}`} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                        Details &rarr;
                      </Link>
                    </div>
                  </MagicCard>
                </BlurFade>
              ))}
            </SmartCarousel>

          </div>

        </div>
      </section>

      {/* Top 5 Researchers Showcase Section */}
      <section className="border-t border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase">Top Authors & Scientists</span>
              <h2 className="text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 mt-0.5">Top 5 Researchers</h2>
            </div>
            
            {/* AvatarCircles preview */}
            <div className="flex items-center gap-3">
              <AvatarCircles avatarUrls={teamAvatars} numPeople={TEAM.length} />
              <Link to="/researchers" className="group text-xs font-bold text-white dark:text-zinc-900 bg-zinc-950 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 px-4 py-2 rounded-full flex items-center gap-1.5 transition-all shadow-sm dark:shadow-none">
                View Directory <ArrowRight className="h-3.5 w-3.5 text-[#93d500] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {topFiveResearchers.map((member, i) => (
              <BlurFade key={member.id} delay={0.08 * i}>
                <MagicCard className="p-4 text-center transition-all group hover:border-indigo-300 flex flex-col justify-between h-full w-full">
                  <div>
                    <Link to={`/researcher/${member.orcidId || member.id}`} className="block relative inline-block mb-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        width="64"
                        height="64"
                        loading="lazy"
                        decoding="async"
                        className="h-16 w-16 rounded-full mx-auto object-cover border-2 border-zinc-950 dark:border-zinc-50 shadow-xs dark:shadow-none group-hover:scale-105 transition-transform"
                      />
                    </Link>
                    
                    <Link to={`/researcher/${member.orcidId || member.id}`}>
                      <div className="font-extrabold text-zinc-950 dark:text-zinc-50 text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {member.name}
                      </div>
                    </Link>
                    <div className="text-[10px] font-semibold text-indigo-600 mt-0.5 line-clamp-1">{member.area}</div>
                    
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                      {member.headline}
                    </p>
                  </div>

                    <div className="mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                      <span className="font-bold text-[#5c8a00]">{member.pubCount} Papers</span>
                      <Link to={`/researcher/${member.orcidId || member.id}`} className="font-bold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 transition-colors">
                        Profile &rarr;
                      </Link>
                    </div>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

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

      {/* Floating Smart Scroll to Top Button */}
      <ScrollToTop />

    </div>
  );
}
