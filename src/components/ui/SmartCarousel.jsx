import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export function SmartCarousel({
  children,
  className = '',
  itemClassName = '',
  autoPlay = false,
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
  title = '',
  subtitle = '',
  badge = '',
  actionButton = null,
}) {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  const updateScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);

    // Calculate approximate active item index based on scroll position
    const childrenElements = Array.from(el.children);
    if (childrenElements.length > 0) {
      setItemCount(childrenElements.length);
      const itemWidth = childrenElements[0].getBoundingClientRect().width + 24; // width + gap
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(Math.max(0, index), childrenElements.length - 1));
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  // Auto-play logic with pause on hover
  useEffect(() => {
    if (!autoPlay || itemCount <= 1) return;

    const interval = setInterval(() => {
      const el = containerRef.current;
      if (!el) return;

      const nextIndex = (activeIndex + 1) % itemCount;
      scrollToIndex(nextIndex);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, activeIndex, itemCount]);

  const scroll = (direction) => {
    const el = containerRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  const scrollToIndex = (index) => {
    const el = containerRef.current;
    if (!el) return;

    const childrenElements = Array.from(el.children);
    if (childrenElements[index]) {
      childrenElements[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  };

  return (
    <div className={cn("space-y-6 relative group/carousel", className)}>
      
      {/* Optional Header Row with Navigation Arrows */}
      {(title || showControls || actionButton) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {(title || subtitle || badge) && (
            <div>
              {badge && <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase">{badge}</span>}
              {title && <h2 className="text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 mt-0.5">{title}</h2>}
              {subtitle && <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{subtitle}</p>}
            </div>
          )}

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {actionButton}
            
            {showControls && (
              <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-full border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs">
                <button
                  type="button"
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  aria-label="Scroll Left"
                  className={cn(
                    "p-2 rounded-full transition-all text-zinc-700 dark:text-zinc-300",
                    canScrollLeft
                      ? "hover:bg-white dark:hover:bg-zinc-700 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-xs cursor-pointer"
                      : "opacity-35 cursor-not-allowed text-zinc-400 dark:text-zinc-600"
                  )}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  aria-label="Scroll Right"
                  className={cn(
                    "p-2 rounded-full transition-all text-zinc-700 dark:text-zinc-300",
                    canScrollRight
                      ? "hover:bg-white dark:hover:bg-zinc-700 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-xs cursor-pointer"
                      : "opacity-35 cursor-not-allowed text-zinc-400 dark:text-zinc-600"
                  )}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Carousel Track Container */}
      <div className="relative">
        
        {/* Left Scroll Gradient Overlay Indicator */}
        <div
          className={cn(
            "pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-zinc-50 dark:from-zinc-900 to-transparent transition-opacity duration-300",
            canScrollLeft ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Right Scroll Gradient Overlay Indicator */}
        <div
          className={cn(
            "pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-zinc-50 dark:from-zinc-900 to-transparent transition-opacity duration-300",
            canScrollRight ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Scrollable Track */}
        <div
          ref={containerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 px-1 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {React.Children.map(children, (child, idx) => (
            <div
              key={idx}
              className={cn("snap-start shrink-0", itemClassName)}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Indicator Dots */}
      {showIndicators && itemCount > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {Array.from({ length: itemCount }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                activeIndex === idx
                  ? "w-6 bg-indigo-600 dark:bg-indigo-400"
                  : "w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600"
              )}
            />
          ))}
        </div>
      )}

    </div>
  );
}
