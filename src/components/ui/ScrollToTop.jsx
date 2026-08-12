import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        "fixed bottom-6 right-6 z-50 p-2.5 rounded-full bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 shadow-lg dark:shadow-zinc-900/50 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group cursor-pointer border border-zinc-800 dark:border-zinc-200"
      )}
    >
      {/* SVG Scroll Progress Circle */}
      <svg className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="stroke-zinc-700/40 dark:stroke-zinc-300/40 fill-none"
          strokeWidth="2.5"
        />
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="stroke-indigo-500 dark:stroke-indigo-600 fill-none transition-all duration-150"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      <ArrowUp className="h-4 w-4 relative z-10 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}
