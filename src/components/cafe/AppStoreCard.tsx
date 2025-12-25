'use client';

import { motion } from 'framer-motion';
import { Software } from '@/types/software';
import Link from 'next/link';
import { Star, Download } from 'lucide-react';

interface AppStoreCardProps {
  app: Software;
  index: number;
}

export default function AppStoreCard({ app, index }: AppStoreCardProps) {
  // Use consistent value based on app name for SSR/client match
  const fileSize = app.platforms.length * 150 + (app.name.length * 50);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex-shrink-0 w-[240px] md:w-[280px]"
    >
      <Link href={`/cafe/${app.id}`} className="block group">
        {/* App Preview Image */}
        <div 
          className="relative h-[140px] md:h-[180px] overflow-hidden mb-3 bg-gradient-to-br border-2 md:border-4 border-charcoal shadow-[2px_2px_0px_0px_#2D2D2D] md:shadow-retro group-hover:shadow-[4px_4px_0px_0px_#E05228] md:group-hover:shadow-[6px_6px_0px_0px_#E05228] transition-all"
          style={{
            background: `linear-gradient(135deg, ${app.color}60, ${app.color}30)`,
          }}
        >
          {/* Image Placeholder with decorative elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-6xl md:text-8xl opacity-40"
            >
              {app.icon}
            </motion.div>
          </div>
          
          {/* Rating Badge */}
          <div className="absolute top-2 left-2 md:top-3 md:left-3 flex items-center gap-1 md:gap-1.5 bg-teal backdrop-blur-md border-2 border-charcoal px-2 py-0.5 md:px-2.5 md:py-1 shadow-[2px_2px_0px_0px_#2D2D2D]">
            <Star className="w-3.5 h-3.5 fill-cream text-cream" />
            <span className="text-cream text-xs font-bold">4.9</span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* App Info */}
        <div className="space-y-2">
          <h3 className="font-display uppercase text-base text-charcoal line-clamp-1 group-hover:text-orange transition-colors">
            {app.name}
          </h3>
          <p className="text-sm font-medium text-charcoal/70 line-clamp-2 leading-snug">
            {app.tagline}
          </p>
          
          {/* Footer with size and button */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1 text-charcoal/60">
              <Download className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span className="text-xs font-bold uppercase">{fileSize}MB</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-1.5 bg-charcoal hover:bg-orange text-cream border-2 border-charcoal font-display uppercase text-sm transition-colors shadow-[2px_2px_0px_0px_currentColor]"
            >
              {app.price === 0 ? 'Get' : `$${app.price}`}
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
