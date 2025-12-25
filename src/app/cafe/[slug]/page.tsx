'use client';

import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { getSoftwareById } from '@/lib/softwareData';
import AnimatedBackground from '@/components/cafe/AnimatedBackground';
import { ArrowLeft, Download, ExternalLink, Github } from 'lucide-react';

const platforms = {
  web: '🌐',
  mac: '🍎',
  windows: '🪟',
  linux: '🐧',
  ios: '📱',
  android: '🤖',
};

export default function AppDetailPage() {
  const params = useParams();
  const router = useRouter();
  const app = getSoftwareById(params.slug as string);

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">App not found</h1>
          <button
            onClick={() => router.push('/cafe')}
            className="text-blue-500 hover:underline"
          >
            Return to Café
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <AnimatedBackground />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/cafe')}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Café
        </motion.button>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-8xl md:text-9xl"
            >
              {app.icon}
            </motion.div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">{app.name}</h1>
              <p className="text-2xl text-zinc-400 mb-6">{app.tagline}</p>
              <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                {app.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 text-sm text-zinc-400 mb-8">
                <div>
                  <span className="text-zinc-500">Version</span>
                  <p className="text-white font-medium">{app.version}</p>
                </div>
                <div>
                  <span className="text-zinc-500">Release Date</span>
                  <p className="text-white font-medium">
                    {new Date(app.releaseDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <span className="text-zinc-500">Category</span>
                  <p className="text-white font-medium capitalize">{app.category}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {app.downloadUrl && (
                  <motion.a
                    href={app.downloadUrl}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl font-medium text-white flex items-center gap-2 shadow-lg"
                    style={{ backgroundColor: app.color }}
                  >
                    <Download className="w-5 h-5" />
                    {app.price === 0 ? 'Download Free' : `Buy for $${app.price}`}
                  </motion.a>
                )}

                {app.demoUrl && (
                  <motion.a
                    href={app.demoUrl}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl font-medium border-2 flex items-center gap-2"
                    style={{
                      borderColor: app.color,
                      color: app.color,
                    }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    Try Demo
                  </motion.a>
                )}

                {app.githubUrl && (
                  <motion.a
                    href={app.githubUrl}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl font-medium border-2 border-white/20 text-zinc-300 hover:border-white/40 hover:text-white flex items-center gap-2"
                  >
                    <Github className="w-5 h-5" />
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
          <h2 className="text-2xl font-bold mb-4">Available On</h2>
          <div className="flex flex-wrap gap-4">
            {app.platforms.map((platform) => (
              <div
                key={platform}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3"
              >
                <span className="text-3xl">{platforms[platform]}</span>
                <span className="capitalize font-medium">{platform}</span>
              </div>
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
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {app.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <span style={{ color: app.color }} className="text-xl mt-0.5">
                  ✓
                </span>
                <span className="text-zinc-300">{feature}</span>
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
          <h2 className="text-2xl font-bold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-3">
            {app.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300"
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
          className="mt-16 p-8 rounded-3xl bg-white/5 border border-white/10"
        >
          <h2 className="text-2xl font-bold mb-4">Documentation</h2>
          <p className="text-zinc-400 mb-6">
            Get started with {app.name} in minutes. Check out our comprehensive documentation,
            tutorials, and API reference.
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium"
            style={{
              backgroundColor: `${app.color}20`,
              color: app.color,
            }}
          >
            View Documentation
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.section>
      </div>
    </div>
  );
}
