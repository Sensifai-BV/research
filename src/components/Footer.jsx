import React from 'react';
import { Link } from 'react-router-dom';
import { Particles } from './magicui/Particles';
import { AnimatedShinyText } from './magicui/AnimatedShinyText';
import sensifaiLogo from '../assets/sensifai-logo.png';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 py-14 text-zinc-600 dark:text-zinc-400">
      <Particles className="absolute inset-0 opacity-40" quantity={40} color="#6366f1" />
      
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 mb-3">
              <img src={sensifaiLogo} alt="Sensifai Labs Logo" width="150" height="28" loading="lazy" decoding="async" className="h-7 w-auto object-contain" />
              <span className="text-base font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
                Sensifai <span className="font-black text-[#93d500]">Labs</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
              Sensifai Research Labs drives breakthroughs in multimodal AI. Explore our latest publications, research areas, and meet our top scientists.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50 mb-3">Research</h4>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              <li><Link to="/publications" className="hover:text-indigo-600 transition-colors">Publications Library</Link></li>
              <li><a href="https://zenodo.org/communities/sensifai-bv" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Zenodo Community</a></li>
              <li><a href="https://github.com/Sensifai-BV" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Sensifai GitHub Repos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50 mb-3">Institute</h4>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              <li><Link to="/researchers" className="hover:text-indigo-600 transition-colors">Researchers Directory</Link></li>
              <li><a href="https://sensifai.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Sensifai Corporate Site</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50 mb-3">Connect</h4>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              <li><a href="https://www.linkedin.com/company/17888541/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">LinkedIn Company Page</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-100 dark:border-zinc-800 pt-6 text-xs text-zinc-400 dark:text-zinc-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Sensifai Inc. Open Access under CC BY 4.0 License.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-600 dark:hover:text-zinc-400">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
