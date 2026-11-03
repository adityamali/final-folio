'use client';

import { motion } from 'framer-motion';
import { Software } from '@/types/software';
import Link from 'next/link';
import Image from 'next/image';

interface AppCardProps {
  app: Software;
  index: number;
  featured?: boolean;
}

export default function AppCard({ app, index, featured = false }: AppCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.08,
      },
    },
  };

  return (
    <Link href={`/cafe/${app.id}`}>
      <motion.article
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        whileHover={{ y: -6, scale: 1.02 }}
        className={`group relative overflow-hidden rounded-2xl md:rounded-3xl border-2 md:border-4 border-charcoal bg-gradient-to-br cursor-pointer transition-all duration-500 hover:shadow-[4px_4px_0px_0px_#2D2D2D] ${
          featured ? 'h-[320px] md:h-[500px]' : 'h-[220px] md:h-[280px]'
        }`}
        style={{
          background: `linear-gradient(135deg, ${app.color}15, ${app.color}05)`,
        }}
      >
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${app.color}25, transparent)`,
          }}
        />

        {/* Content */}
        <div className="relative h-full p-4 md:p-8 flex flex-col justify-between">
          {/* Top Section */}
          <div className="space-y-3">
            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`${featured ? 'text-6xl md:text-8xl' : 'text-5xl md:text-6xl'} shrink-0`}
            >
              {app.icon && (app.icon.startsWith('/') || app.icon.startsWith('http')) ? (
                <div className={`relative ${featured ? 'w-16 h-16 md:w-20 md:h-20' : 'w-12 h-12 md:w-14 md:h-14'} rounded-xl overflow-hidden border-2 border-charcoal bg-cream p-1.5 shadow-[2px_2px_0px_0px_#2D2D2D]`}>
                  <Image
                    src={app.icon}
                    alt={app.name}
                    fill
                    className="object-contain p-1"
                    unoptimized
                  />
                </div>
              ) : (
                <span>{app.icon}</span>
              )}
            </motion.div>
            
            {/* Price Badge */}
            {app.price > 0 && (
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${app.color}30`,
                  color: app.color,
                }}
              >
                ${app.price}
              </div>
            )}
          </div>

          {/* Bottom Section */}
          <div className="space-y-2">
            <h3 className={`font-display uppercase text-white drop-shadow-md ${featured ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
              {app.name}
            </h3>
            <p className="text-zinc-200 text-xs md:text-base line-clamp-2">
              {app.tagline}
            </p>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
