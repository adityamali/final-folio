'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { softwareData } from '@/lib/softwareData';
import FeaturedHeroCard from '@/components/cafe/FeaturedHeroCard';
import AppRow from '@/components/cafe/AppRow';

const categories = ['all', 'productivity', 'design', 'developer', 'ai', 'utility'] as const;

export default function CafePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredSoftware = selectedCategory === 'all' 
    ? softwareData 
    : softwareData.filter(app => app.category === selectedCategory);

  const featuredApps = softwareData.filter(app => app.featured);
  const developerApps = softwareData.filter(app => app.category === 'developer');
  const productivityApps = softwareData.filter(app => app.category === 'productivity');
  const designApps = softwareData.filter(app => app.category === 'design');

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-20">
      {/* Top Navigation Tabs */}
    <div className="pt-24 pb-8 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
        Software Café
        </h1>
        <p className="text-xl md:text-2xl text-[var(--foreground)]/60 max-w-2xl">
        Brewed with passion, served with pixel-perfect precision.
        </p>
      </motion.div>
    </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Featured Cards */}
        <section className="py-8 md:py-12">
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {featuredApps.slice(0, 3).map((app, index) => (
              <FeaturedHeroCard
                key={app.id}
                app={app}
                index={index}
                size={index === 0 ? 'large' : 'medium'}
              />
            ))}
          </div>
        </section>

        {/* Developer Apps Row */}
        {developerApps.length > 0 && (
          <AppRow title="Developer Tools" apps={developerApps} />
        )}

        {/* Productivity Apps Row */}
        {productivityApps.length > 0 && (
          <AppRow title="Productivity & Workflow" apps={productivityApps} />
        )}

        {/* Design Apps Row */}
        {designApps.length > 0 && (
          <AppRow title="Design & Creative" apps={designApps} />
        )}

        {/* All Apps Section */}
        {selectedCategory !== 'all' && (
          <section className="py-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              All {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Apps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSoftware.map((app, index) => (
                <div key={app.id} className="w-full">
                  <AppRow title="" apps={[app]} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
