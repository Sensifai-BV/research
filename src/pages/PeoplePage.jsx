import React from 'react';
import { Link } from 'react-router-dom';
import { TEAM, PAPERS, CONTENT_STATS } from '../data/papersData';
import { FileCode } from 'lucide-react';
import { GithubIcon, LinkedinIcon, ScholarIcon, OrcidIcon } from '../components/ui/SocialIcons';

// Magic UI Components
import { MagicCard } from '../components/magicui/MagicCard';
import { BlurFade } from '../components/magicui/BlurFade';

export function PeoplePage() {
  // Safe sort researchers by publication count
  const sortedResearchers = [...(TEAM || [])].map(r => {
    const pubCount = (PAPERS || []).filter(p =>
      p && p.authors && Array.isArray(p.authors) && p.authors.some(a =>
        a && (
          a.id === r.orcidId ||
          a.id === r.id ||
          (a.name && r.name && typeof a.name === 'string' && typeof r.name === 'string' && a.name.toLowerCase() === r.name.toLowerCase())
        )
      )
    ).length;
    return { ...r, pubCount };
  }).sort((a, b) => (b.pubCount || 0) - (a.pubCount || 0));

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-900/50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Header */}
        <BlurFade delay={0.1}>
          <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-600/20">
              <FileCode className="h-3.5 w-3.5 text-emerald-600" />
              Research Team ({CONTENT_STATS?.totalAuthorsCount || TEAM.length} Authors)
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
              Sensifai Researchers & Authors
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Leading scientists and research engineers shaping real-time video, audio, and edge AI breakthroughs.
            </p>
          </div>
        </BlurFade>

        {/* Team Grid sorted by Publications */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedResearchers.map((member, index) => (
            <BlurFade key={member.id} delay={0.08 * index}>
              <MagicCard className="flex flex-col justify-between text-center h-full group hover:border-indigo-300">
                <div>
                  <Link to={`/researcher/${member.orcidId || member.id}`} className="group">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="h-24 w-24 rounded-full mx-auto object-cover border-2 border-zinc-950 dark:border-zinc-50 shadow-sm dark:shadow-none group-hover:scale-105 transition-transform"
                    />
                  </Link>

                  <h3 className="mt-4 font-black text-zinc-950 dark:text-zinc-50 text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    <Link to={`/researcher/${member.orcidId || member.id}`}>
                      {member.name}
                    </Link>
                  </h3>
                  
                  <div className="text-xs font-semibold text-indigo-600 mt-0.5">{member.role}</div>
                  <div className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">{member.affiliation}</div>

                  <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-4 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-[#5c8a00]">
                      {member.pubCount} Publications
                    </span>
                    <span className="font-bold text-indigo-600">
                      {member.citations || 0} Citations
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-100 dark:border-zinc-800">
                    <span>h-index: <strong className="text-zinc-950 dark:text-zinc-50 font-extrabold">{member.hIndex || 0}</strong></span>
                    <span>i10-index: <strong className="text-zinc-950 dark:text-zinc-50 font-extrabold">{member.i10Index || 0}</strong></span>
                  </div>
                </div>

              </MagicCard>
            </BlurFade>
          ))}
        </div>

      </div>
    </div>
  );
}
