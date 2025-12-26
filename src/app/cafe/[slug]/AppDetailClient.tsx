'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import AnimatedBackground from '@/components/cafe/AnimatedBackground';
import { ArrowLeft, Download, ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { Software } from '@/types/software';

const platforms = {
  web: '🌐',
  mac: '🍎',
  windows: '🪟',
  linux: '🐧',
  ios: '📱',
  android: '🤖',
};

export default function AppDetailClient({ app }: { app: Software }) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);

  // Generate placeholder screenshots for demo
  const screenshots = [
    { id: 1, title: 'Main Interface', url: `https://placehold.co/1200x800/${app?.color?.replace('#', '')}/2D2D2D?text=${app?.name}+Dashboard` },
    { id: 2, title: 'Feature View', url: `https://placehold.co/1200x800/${app?.color?.replace('#', '')}/2D2D2D?text=${app?.name}+Features` },
    { id: 3, title: 'Settings Panel', url: `https://placehold.co/1200x800/${app?.color?.replace('#', '')}/2D2D2D?text=${app?.name}+Settings` },
    { id: 4, title: 'Mobile View', url: `https://placehold.co/1200x800/${app?.color?.replace('#', '')}/2D2D2D?text=${app?.name}+Mobile` },
  ];

  return (
    <div className="min-h-screen bg-cream text-charcoal pb-20">
      <AnimatedBackground />
      
      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* Back Button */}
        <motion.button
          onClick={() => router.push('/cafe')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-8 px-6 py-3 font-display uppercase border-4 border-charcoal flex items-center gap-2 bg-cream hover:bg-teal hover:text-cream shadow-retro transition-all"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
          Back to Café
        </motion.button>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 p-8 border-4 border-charcoal shadow-retro bg-cream"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="text-8xl border-4 border-charcoal p-6 bg-cream shadow-retro shrink-0"
              style={{ backgroundColor: `${app.color}20` }}
            >
              {app.icon}
            </motion.div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="font-display text-5xl md:text-6xl uppercase text-orange drop-shadow-md mb-4">{app.name}</h1>
              <p className="font-accent text-2xl text-teal mb-6 -rotate-1">{app.tagline}</p>
              <p className="text-lg font-medium text-charcoal/80 leading-relaxed mb-8 border-l-4 border-mustard pl-4">
                {app.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 text-sm mb-8 border-4 border-charcoal p-6 shadow-retro bg-cream">
                <div>
                  <span className="font-mono uppercase text-xs text-charcoal/50">Version</span>
                  <p className="font-display uppercase text-charcoal text-lg">{app.version}</p>
                </div>
                <div>
                  <span className="font-mono uppercase text-xs text-charcoal/50">Release Date</span>
                  <p className="font-display uppercase text-charcoal text-lg">
                    {new Date(app.releaseDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <span className="font-mono uppercase text-xs text-charcoal/50">Category</span>
                  <p className="font-display uppercase text-charcoal text-lg">{app.category}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {app.downloadUrl && (
                  <motion.a
                    href={app.downloadUrl}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 font-display uppercase text-cream flex items-center gap-2 border-2 border-charcoal shadow-retro hover:shadow-[6px_6px_0px_0px_#2D2D2D] transition-all"
                    style={{ backgroundColor: app.color }}
                  >
                    <Download className="w-5 h-5" strokeWidth={2.5} />
                    {app.price === 0 ? 'Download Free' : `Buy $${app.price}`}
                  </motion.a>
                )}

                {app.demoUrl && (
                  <motion.a
                    href={app.demoUrl}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 font-display uppercase border-4 border-charcoal flex items-center gap-2 bg-cream hover:bg-teal hover:text-cream shadow-retro transition-all"
                    style={{ color: app.color }}
                  >
                    <ExternalLink className="w-5 h-5" strokeWidth={2.5} />
                    Try Demo
                  </motion.a>
                )}

                {app.githubUrl && (
                  <motion.a
                    href={app.githubUrl}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 font-display uppercase border-4 border-charcoal text-charcoal hover:bg-charcoal hover:text-cream flex items-center gap-2 bg-cream shadow-retro transition-all"
                  >
                    <Github className="w-5 h-5" strokeWidth={2.5} />
                    View Source
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Platforms */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl uppercase text-charcoal mb-6 border-b-4 border-charcoal pb-2">Available On</h2>
          <div className="flex flex-wrap gap-4">
            {app.platforms.map((platform) => (
              <div
                key={platform}
                className="px-6 py-3 bg-teal text-cream border-2 border-charcoal flex items-center gap-3 shadow-[2px_2px_0px_0px_#2D2D2D]"
              >
                <span className="text-3xl">{platforms[platform as keyof typeof platforms]}</span>
                <span className="font-display uppercase">{platform}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Screenshots Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl uppercase text-charcoal mb-6 border-b-4 border-charcoal pb-2">Gallery</h2>
          
          {/* Main Image */}
          <motion.div 
            className="relative aspect-video mb-4 border-4 border-charcoal shadow-retro overflow-hidden bg-charcoal/10"
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={screenshots[selectedImage].url}
              alt={screenshots[selectedImage].title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute bottom-0 left-0 right-0 bg-charcoal/80 backdrop-blur-sm p-4 border-t-2 border-cream">
              <p className="font-display uppercase text-cream">{screenshots[selectedImage].title}</p>
            </div>
          </motion.div>

          {/* Thumbnail Navigation */}
          <div className="grid grid-cols-4 gap-4">
            {screenshots.map((screenshot, index) => (
              <motion.button
                key={screenshot.id}
                onClick={() => setSelectedImage(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative aspect-video border-4 transition-all ${
                  selectedImage === index 
                    ? 'border-orange shadow-retro' 
                    : 'border-charcoal hover:border-teal'
                }`}
              >
                <Image
                  src={screenshot.url}
                  alt={screenshot.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl uppercase text-charcoal mb-6 border-b-4 border-charcoal pb-2">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {app.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                className="flex items-start gap-3 p-4 bg-cream border-2 border-charcoal shadow-[2px_2px_0px_0px_#2D2D2D]"
              >
                <span style={{ color: app.color }} className="text-xl mt-0.5 font-bold">
                  ✓
                </span>
                <span className="font-medium text-charcoal">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tags */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="font-display text-3xl uppercase text-charcoal mb-6 border-b-4 border-charcoal pb-2">Tags</h2>
          <div className="flex flex-wrap gap-3">
            {app.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-mustard text-charcoal border-2 border-charcoal font-bold uppercase text-sm shadow-[2px_2px_0px_0px_#2D2D2D]"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Documentation Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 p-8 bg-orange border-4 border-charcoal shadow-retro"
        >
          <h2 className="font-display text-3xl uppercase text-charcoal mb-4">Documentation</h2>
          <p className="font-medium text-charcoal/80 mb-6">
            Get started with {app.name} quickly. Access comprehensive guides, API references, and integration examples.
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 font-display uppercase bg-charcoal text-cream border-2 border-charcoal hover:bg-teal transition-colors shadow-[2px_2px_0px_0px_#2D2D2D]"
          >
            View Documentation
            <ExternalLink className="w-4 h-4" strokeWidth={2.5} />
          </motion.a>
        </motion.section>
      </div>
    </div>
  );
}
