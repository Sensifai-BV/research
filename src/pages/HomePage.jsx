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
    <div className="min-h-screen bg-zinc-50/50">
      
      {/* Magic UI Hero Section */}
      <section className="relative border-b border-zinc-200/80 bg-white py-14 lg:py-20 overflow-hidden">
        {/* Magic UI Particles background */}
        <Particles className="hidden lg:block absolute inset-0 z-0 opacity-60" quantity={65} color="#6366f1" size={0.7} />
        
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Headline, Actions & Metrics */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Sparkles Headline */}
              <BlurFade delay={0.15}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 leading-[1.1] text-center lg:text-left">
                  <SparklesText text="Sensifai Research Labs" colors={{ first: "#93d500", second: "#6366f1" }} className="inline-block" />
                </h1>
              </BlurFade>

              {/* Typing Animation Subhead */}
              <BlurFade delay={0.2}>
                <div className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
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
                    <ShimmerButton className="font-extrabold text-xs px-6 py-3 shadow-md">
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
                <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-zinc-100/80 mt-6 text-center lg:text-left">
                  
                  <div className="space-y-0.5">
                    <div className="text-xl font-black tracking-tight text-zinc-950 flex justify-center lg:justify-start items-center gap-0.5">
                      <NumberTicker value={CONTENT_STATS?.totalPublicationsCount || 6} className="text-zinc-950" />
                      <span>+</span>
                    </div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider whitespace-nowrap">Publications</div>
                  </div>

                  <div className="space-y-0.5 sm:border-l sm:border-zinc-200/60 sm:pl-3">
                    <div className="text-xl font-black tracking-tight text-indigo-600 flex justify-center lg:justify-start items-center gap-0.5">
                      <NumberTicker value={CONTENT_STATS?.totalCitations || 1961} className="text-indigo-600" />
                      <span>+</span>
                    </div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider whitespace-nowrap">Total Citations</div>
                  </div>

                  <div className="space-y-0.5 sm:border-l sm:border-zinc-200/60 sm:pl-3">
                    <div className="text-xl font-black tracking-tight text-emerald-600 flex justify-center lg:justify-start items-center">
                      <NumberTicker value={CONTENT_STATS?.averageCitationsPerPaper || 327} className="text-emerald-600" />
                    </div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider whitespace-nowrap">Avg Citations</div>
                  </div>

                  <div className="space-y-0.5 sm:border-l sm:border-zinc-200/60 sm:pl-3">
                    <div className="text-xl font-black tracking-tight text-sky-600 flex justify-center lg:justify-start items-center">
                      <NumberTicker value={CONTENT_STATS?.totalResearchAreasCount || 5} className="text-sky-600" />
                    </div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider whitespace-nowrap">Domains</div>
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
              <h2 className="text-3xl font-extrabold text-zinc-950 mt-0.5">5 Recent Publications</h2>
            </div>
            
            <Link to="/publications" className="group text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 px-4 py-2 rounded-full flex items-center gap-1.5 transition-all shadow-sm">
              View Full Library <ArrowRight className="h-3.5 w-3.5 text-[#93d500] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {latestFivePapers.map((paper, index) => (
              <BlurFade key={paper.id} delay={0.08 * index}>
                <MagicCard
                  shine={index === 0}
                  shineColor={["#93d500", "#6366f1", "#0284c7"]}
                  className="relative group hover:border-indigo-300 flex flex-col justify-between h-full p-4"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                      <Badge variant="indigo" className="text-[10px] px-2 py-0.5">{paper.areaBadge || paper.areaName}</Badge>
                      {paper.isPublished && (
                        <Badge variant="published" className="text-[10px] px-1.5 py-0.5" title={`Published in ${paper.venue}`}>
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" /> {paper.year}
                        </Badge>
                      )}
                    </div>

                    <Link to={`/publication/${paper.id}`} className="hover:text-indigo-600 transition-colors">
                      <h3 className="text-sm leading-snug font-bold text-zinc-950 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {paper.title}
                      </h3>
                    </Link>

                    <div className="text-[11px] text-zinc-500 mt-2 font-medium line-clamp-1">
                      By {paper.authors ? paper.authors.map(a => a?.name || '').filter(Boolean).join(', ') : 'Sensifai Labs'}
                    </div>

                    <p className="mt-3 text-[11px] leading-relaxed text-zinc-600 line-clamp-3">
                      {paper.abstract}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between gap-1.5 border-t border-zinc-100 pt-3 mt-4">
                    {paper.pdfUrl ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedPaperForPdf(paper)}
                        className="h-6 px-2 text-[10px] font-bold gap-1 text-zinc-800 border-zinc-300 hover:border-indigo-300"
                      >
                        <Eye className="h-3 w-3 text-indigo-600" />
                        Show
                      </Button>
                    ) : paper.journalUrl ? (
                      <a href={paper.journalUrl} target="_blank" rel="noreferrer">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-[10px] font-bold gap-1 text-zinc-800 border-zinc-300 hover:border-indigo-300"
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
                      className="h-6 px-1.5 text-[10px] text-zinc-500 gap-1 hover:text-zinc-900"
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
      </section>

      {/* Top 5 Researchers Showcase Section */}
      <section className="border-t border-b border-zinc-200/80 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase">Top Authors & Scientists</span>
              <h2 className="text-3xl font-extrabold text-zinc-950 mt-0.5">Top 5 Researchers</h2>
            </div>
            
            {/* AvatarCircles preview */}
            <div className="flex items-center gap-3">
              <AvatarCircles avatarUrls={teamAvatars} numPeople={TEAM.length} />
              <Link to="/researchers" className="group text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 px-4 py-2 rounded-full flex items-center gap-1.5 transition-all shadow-sm">
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
                        className="h-16 w-16 rounded-full mx-auto object-cover border-2 border-zinc-950 shadow-xs group-hover:scale-105 transition-transform"
                      />
                    </Link>
                    
                    <Link to={`/researcher/${member.orcidId || member.id}`}>
                      <div className="font-extrabold text-zinc-950 text-sm group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {member.name}
                      </div>
                    </Link>
                    <div className="text-[10px] font-semibold text-indigo-600 mt-0.5 line-clamp-1">{member.area}</div>
                    
                    <p className="text-[11px] text-zinc-500 line-clamp-2 mt-2 leading-relaxed">
                      {member.headline}
                    </p>
                  </div>

                    <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                      <span className="font-bold text-[#5c8a00]">{member.pubCount} Papers</span>
                      <Link to={`/researcher/${member.orcidId || member.id}`} className="font-bold text-zinc-900 hover:text-indigo-600 transition-colors">
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

    </div>
  );
}
