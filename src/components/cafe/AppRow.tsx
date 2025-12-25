'use client';

import { Software } from '@/types/software';
import AppStoreCard from './AppStoreCard';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AppRowProps {
  title: string;
  apps: Software[];
}

export default function AppRow({ title, apps }: AppRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-6 md:py-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4 md:mb-6 border-b-2 border-charcoal pb-3 md:pb-4">
        <h2 className="font-display text-2xl md:text-4xl uppercase text-charcoal">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 bg-teal text-cream border-2 border-charcoal hover:bg-orange transition-colors shadow-[2px_2px_0px_0px_#2D2D2D] disabled:opacity-40"
            aria-label="Scroll left"
            disabled={!apps.length}
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 bg-teal text-cream border-2 border-charcoal hover:bg-orange transition-colors shadow-[2px_2px_0px_0px_#2D2D2D] disabled:opacity-40"
            aria-label="Scroll right"
            disabled={!apps.length}
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-3 md:pb-4 snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {apps.map((app, index) => (
          <div key={app.id} className="snap-start">
            <AppStoreCard app={app} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
