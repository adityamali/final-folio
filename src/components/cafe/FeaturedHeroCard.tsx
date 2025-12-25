'use client';

import { motion } from 'framer-motion';
import { Software } from '@/types/software';
import Link from 'next/link';
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
        className={`relative overflow-hidden rounded-3xl ${
          isLarge ? 'h-[400px] md:h-[500px]' : 'h-[400px]'
        }`}
        style={{
          background: `linear-gradient(135deg, ${app.color}40, ${app.color}20)`,
        }}
      >
        {/* Background Image Placeholder */}
        <div 
          className="absolute inset-0 bg-gradient-to-br opacity-60 group-hover:opacity-70 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${app.color}, ${app.color}80)`,
          }}
        />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-20"
            style={{ backgroundColor: app.color }}
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full opacity-20"
            style={{ backgroundColor: app.color }}
          />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
          {/* Top - App Icon Badge */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md rounded-full px-4 py-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-lg border-2 border-white/50">
                  {app.icon}
                </div>
              </div>
              <span className="text-white/90 text-sm font-medium">12k+ Playing</span>
            </div>
          </div>

          {/* Bottom - App Info */}
          <div className="space-y-4">
            {/* Stats */}
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md rounded-full px-3 py-1.5">
                <Star className="w-4 h-4 fill-white" />
                <span className="text-sm font-medium">4.9</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md rounded-full px-3 py-1.5">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {app.price === 0 ? 'Free' : `$${app.price}`}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className={`font-bold text-white ${isLarge ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl'}`}>
              {app.name}
            </h3>

            {/* App Badge & Description */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: `${app.color}40` }}>
                {app.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-base md:text-lg mb-1">
                  {app.name}
                </p>
                <p className="text-white/80 text-sm line-clamp-1">
                  {app.tagline}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-full font-semibold text-sm backdrop-blur-sm transition-colors flex-shrink-0"
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
