'use client';

import { motion } from 'framer-motion';
import { Software } from '@/types/software';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Download } from 'lucide-react';

interface FeaturedHeroCardProps {
  app: Software;
  index: number;
  size?: 'large' | 'medium';
}

export default function FeaturedHeroCard({ app, index, size = 'large' }: FeaturedHeroCardProps) {
  const isLarge = size === 'large';
  
  return (
    <Link href={`/cafe/${app.id}`} className={`group block ${isLarge ? 'col-span-2' : ''}`}>
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative overflow-hidden border-2 md:border-4 border-charcoal shadow-[2px_2px_0px_0px_#2D2D2D] md:shadow-retro hover:shadow-[4px_4px_0px_0px_${app.color}] md:hover:shadow-[8px_8px_0px_0px_${app.color}] transition-all ${
        isLarge ? 'h-[320px] md:h-[500px]' : 'h-[260px] md:h-[400px]'
      }`}
      style={{
        background: `linear-gradient(135deg, ${app.color}40, ${app.color}20)`,
      }}
      >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
        src={app.images[0]} 
        alt={`${app.name} screenshot`} 
        fill 
        className="object-fill group-hover:opacity-40 transition-opacity duration-500"
        />
      </div>
      
      {/* Background Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br opacity-60 group-hover:opacity-70 transition-opacity duration-500"
        style={{
        background: `linear-gradient(135deg, ${app.color}, ${app.color}80)`,
        }}
      />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-4 md:p-8 gap-4">

        {/* Bottom - App Info */}
        <div className="space-y-4">
        {/* Stats */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-cream">
          <div className="flex items-center gap-1.5 bg-teal border-2 border-charcoal px-3 py-1 shadow-[2px_2px_0px_0px_#2D2D2D]">
          <Star className="w-4 h-4 fill-cream" />
          <span className="text-sm font-bold">4.9</span>
          </div>
          <div className="flex items-center gap-1.5 bg-orange border-2 border-charcoal px-3 py-1 shadow-[2px_2px_0px_0px_#2D2D2D]">
          <Download className="w-4 h-4" />
          <span className="text-sm font-bold">
            {app.price === 0 ? 'Free' : `$${app.price}`}
          </span>
          </div>
        </div>

        {/* App Badge & Description */}
        <div className="flex flex-col sm:flex-row items-start gap-3 bg-cream border-2 border-charcoal p-3 shadow-[2px_2px_0px_0px_#2D2D2D] md:shadow-retro">
          <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-charcoal flex items-center justify-center text-xl md:text-2xl flex-shrink-0"
          style={{ backgroundColor: `${app.color}40` }}>
          <Image src={app.icon} alt={`${app.name} icon`} width={32} height={32} />
          </div>
          <div className="flex-1 min-w-0">
          <p className="text-charcoal font-display uppercase text-sm md:text-lg mb-1">
            {app.name}
          </p>
          <p className="text-charcoal/70 font-medium text-xs md:text-sm line-clamp-2">
            {app.tagline}
          </p>
          </div>
          <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-charcoal hover:bg-orange text-cream border-2 border-charcoal font-display uppercase text-sm backdrop-blur-sm transition-colors flex-shrink-0"
          >
          Get
          </motion.button>
        </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
    </Link>
  );
}
