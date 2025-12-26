import { motion } from 'framer-motion';
import FeaturedHeroCard from '@/components/cafe/FeaturedHeroCard';
import AppRow from '@/components/cafe/AppRow';
import {getAllSoftware} from '@/lib/software';

export default async function CafePage() {

  const softwareData = await getAllSoftware();

  const selectedCategory: string = 'all';

  const filteredSoftware = selectedCategory === 'all' 
    ? softwareData 
    : softwareData.filter(app => app.category === selectedCategory);

  const featuredApps = softwareData.filter(app => app.featured);
  const developerApps = softwareData.filter(app => app.category === 'developer');
  const utilityApps = softwareData.filter(app => app.category === 'utility');
  const productivityApps = softwareData.filter(app => app.category === 'productivity');
  const designApps = softwareData.filter(app => app.category === 'design');
  const aiApps = softwareData.filter(app => app.category === 'ai');
  const otherApps = softwareData.filter(app => app.category === 'other');

  return (
    <div className="min-h-screen bg-cream text-charcoal pb-20">
      {/* Top Navigation Tabs */}
    <div className="pt-8 pb-8 px-6 max-w-7xl mx-auto">
      <div
        className="border-b-4 border-charcoal pb-8"
      >
        <h1 className="font-display text-5xl md:text-7xl uppercase text-orange drop-shadow-md tracking-tight mb-4">
        Software Café
        </h1>
        <p className="font-accent text-2xl md:text-3xl text-teal -rotate-1 max-w-2xl">
        Brewed with passion, served with pixel-perfect precision.
        </p>
      </div>
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

        {/* Utility Apps Row */}
        {utilityApps.length > 0 && (
          <AppRow title="Utility Tools" apps={utilityApps} />
        )}

        {/* Productivity Apps Row */}
        {productivityApps.length > 0 && (
          <AppRow title="Productivity & Workflow" apps={productivityApps} />
        )}

        {/* Design Apps Row */}
        {designApps.length > 0 && (
          <AppRow title="Design & Creative" apps={designApps} />
        )}

        {/* AI Apps Row */}
        {aiApps.length > 0 && (
          <AppRow title="AI Powered Tools" apps={aiApps} />
        )}

        {/* Other Apps Row */}
        {otherApps.length > 0 && (
          <AppRow title="Other Applications" apps={otherApps} />
        )}

        {/* All Apps Section */}
        {selectedCategory !== 'all' && (
          <section className="py-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              All {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Apps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSoftware.map((app) => (
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
