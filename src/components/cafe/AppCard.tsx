'use client';

import { motion } from 'framer-motion';
import { Software } from '@/types/software';
import Link from 'next/link';

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
        whileHover={{ y: -8, scale: 1.02 }}
        className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br cursor-pointer transition-all duration-500 hover:shadow-2xl ${
          featured ? 'md:col-span-2 md:row-span-2 h-[400px] md:h-[500px]' : 'h-[280px]'
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
        <div className="relative h-full p-6 md:p-8 flex flex-col justify-between">
          {/* Top Section */}
          <div className="space-y-3">
            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`${featured ? 'text-7xl md:text-8xl' : 'text-6xl'}`}
            >
              {app.icon}
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
            <h3 className={`font-bold text-white ${featured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
              {app.name}
            </h3>
            <p className="text-zinc-400 text-sm md:text-base line-clamp-2">
              {app.tagline}
            </p>
          </div>
        </div>

        {/* Accent border on hover */}
        <div
          className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-current transition-all duration-500"
          style={{ color: `${app.color}40` }}
        />
      </motion.article>
    </Link>
  );
}
