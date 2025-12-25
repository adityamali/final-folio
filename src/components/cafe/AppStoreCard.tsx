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
  const fileSize = app.platforms.length * 150 + Math.floor(Math.random() * 500);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex-shrink-0 w-[280px]"
    >
      <Link href={`/cafe/${app.id}`} className="block group">
        {/* App Preview Image */}
        <div 
          className="relative h-[180px] rounded-3xl overflow-hidden mb-3 bg-gradient-to-br"
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
              className="text-8xl opacity-40"
            >
              {app.icon}
            </motion.div>
          </div>
          
          {/* Rating Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-md rounded-full px-2.5 py-1">
            <Star className="w-3.5 h-3.5 fill-white text-white" />
            <span className="text-white text-xs font-semibold">4.9</span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* App Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-base text-[var(--foreground)] line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
            {app.name}
          </h3>
          <p className="text-sm text-[var(--foreground)]/60 line-clamp-2 leading-snug">
            {app.tagline}
          </p>
          
          {/* Footer with size and button */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1 text-[var(--foreground)]/50">
              <Download className="w-3.5 h-3.5" />
              <span className="text-xs">{fileSize}MB</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-1.5 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 rounded-full font-semibold text-sm transition-colors"
              style={{ color: app.color }}
            >
              {app.price === 0 ? 'Get' : `$${app.price}`}
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
