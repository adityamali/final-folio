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
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {apps.map((app, index) => (
          <AppStoreCard key={app.id} app={app} index={index} />
        ))}
      </div>
    </section>
  );
}
