'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, ExternalLink, Github, Coffee, Terminal, ShieldCheck, Zap, Copy, Check, HelpCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Software } from '@/types/software';

const platforms: Record<string, string> = {
  web: '🌐',
  mac: '🍎',
  windows: '🪟',
  linux: '🐧',
  ios: '📱',
  android: '🤖',
};

interface AppDetailViewProps {
  app: Software;
  initialSlug?: string;
}

export default function AppDetailView({ app, initialSlug }: AppDetailViewProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (cmd: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(cmd);
      setCopied(cmd);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const isKill9 = app.slug === 'kill9' || app.name.toLowerCase().includes('kill9');

  // If visited via UUID, update address bar to clean slug without reloading
  useEffect(() => {
    if (initialSlug && app.slug && initialSlug !== app.slug && typeof window !== 'undefined') {
      window.history.replaceState(null, '', `/cafe/${app.slug}`);
    }
  }, [initialSlug, app.slug]);

  const isImageIcon = Boolean(app.icon && (app.icon.startsWith('/') || app.icon.startsWith('http')));
  const screenshots = (app.images && app.images.length > 0)
    ? app.images.map((url, index) => ({
        id: index,
        url,
        title: `${app.name} Screenshot ${index + 1}`,
      }))
    : [
        {
          id: 0,
          url: isImageIcon ? app.icon : '/placeholder-app.jpg',
          title: `${app.name} Preview`,
        },
      ];
  const activeScreenshot = screenshots[selectedImage] || screenshots[0];

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/cafe')}
          className="flex items-center gap-2 text-charcoal hover:text-orange transition-colors mb-8 group px-4 py-2 border-2 border-charcoal hover:shadow-retro"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" strokeWidth={2.5} />
          <span className="font-display uppercase">Back to Café</span>
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
              className="shrink-0"
            >
              {isImageIcon ? (
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl md:rounded-3xl border-4 border-charcoal shadow-retro bg-cream flex items-center justify-center p-3 overflow-hidden">
                  <Image
                    src={app.icon}
                    alt={`${app.name} Icon`}
                    width={140}
                    height={140}
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="text-8xl md:text-9xl">
                  {app.icon}
                </div>
              )}
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
                {/* Buy Me A Coffee Button */}
                {app.buyMeACoffeeUrl && (
                  <motion.a
                    href={app.buyMeACoffeeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 font-display uppercase bg-[#FFDD00] text-charcoal hover:bg-[#FFDD00]/90 flex items-center gap-2 border-2 md:border-4 border-charcoal shadow-retro hover:shadow-[6px_6px_0px_0px_#2D2D2D] transition-all"
                  >
                    <Coffee className="w-5 h-5 text-charcoal" strokeWidth={2.5} />
                    Buy Me A Coffee
                  </motion.a>
                )}

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
                    target="_blank"
                    rel="noopener noreferrer"
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
                <span className="text-3xl">{platforms[platform] || '💻'}</span>
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
              src={activeScreenshot.url}
              alt={activeScreenshot.title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute bottom-0 left-0 right-0 bg-charcoal/80 backdrop-blur-sm p-4 border-t-2 border-cream">
              <p className="font-display uppercase text-cream">{activeScreenshot.title}</p>
            </div>
          </motion.div>

          {/* Thumbnail Navigation */}
          {screenshots.length > 1 && (
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
          )}
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
          className="mb-16"
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

        {/* Specialized SEO / AEO / GEO Section for Kill9 */}
        {isKill9 && (
          <>
            {/* Guide & Terminal Comparison */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mb-16 border-4 border-charcoal bg-cream p-6 md:p-8 shadow-retro"
              id="how-to-kill-server-port"
            >
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-8 h-8 text-orange" strokeWidth={2.5} />
                <h2 className="font-display text-3xl md:text-4xl uppercase text-charcoal">
                  How to Kill a Running Server Port on macOS
                </h2>
              </div>
              <p className="text-charcoal/80 text-lg mb-6 leading-relaxed">
                Ever encountered <code className="bg-charcoal text-cream px-2 py-0.5 font-mono text-sm">Error: listen EADDRINUSE: address already in use :::3000</code>? 
                This happens when a previous development server (Next.js, Vite, Node, Rails) crashed or failed to release its socket. Here is how Kill9 compares to traditional terminal commands:
              </p>

              {/* Comparison Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Method 1: Kill9 GUI */}
                <div className="border-2 border-charcoal bg-[#FDFBF7] p-6 shadow-[4px_4px_0px_0px_#2D2D2D]">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-orange" />
                    <h3 className="font-display text-xl uppercase text-charcoal">Method 1: Kill9 (Fastest & Safest)</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-charcoal/80 mb-4">
                    <li className="flex items-start gap-2">
                      <span className="text-teal font-bold">✓</span>
                      <span><strong>One Click:</strong> Click the menu bar icon and hit Kill on the blocked port.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal font-bold">✓</span>
                      <span><strong>Identifies Project:</strong> Shows the exact directory & package.json name.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal font-bold">✓</span>
                      <span><strong>Graceful SIGTERM:</strong> Lets your database clean up before falling back to SIGKILL.</span>
                    </li>
                  </ul>
                  <div className="bg-charcoal text-cream p-3 font-mono text-xs border border-charcoal flex items-center justify-between">
                    <span>Zero terminal commands needed</span>
                    <span className="text-teal font-bold uppercase">100% Native</span>
                  </div>
                </div>

                {/* Method 2: Terminal Commands */}
                <div className="border-2 border-charcoal bg-[#FDFBF7] p-6 shadow-[4px_4px_0px_0px_#2D2D2D]">
                  <div className="flex items-center gap-2 mb-3">
                    <Terminal className="w-5 h-5 text-charcoal" />
                    <h3 className="font-display text-xl uppercase text-charcoal">Method 2: Terminal Commands</h3>
                  </div>
                  <p className="text-xs text-charcoal/70 mb-3">
                    If you prefer CLI, use these commands to find and kill processes on port 3000:
                  </p>
                  
                  {/* Copyable Command 1 */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs font-mono text-charcoal/60 mb-1">
                      <span>One-liner kill command:</span>
                      <button
                        onClick={() => handleCopy('lsof -ti :3000 | xargs kill -9')}
                        className="flex items-center gap-1 text-orange hover:underline font-bold"
                      >
                        {copied === 'lsof -ti :3000 | xargs kill -9' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-teal" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="bg-charcoal text-cream p-3 text-xs font-mono overflow-x-auto border border-charcoal">
                      lsof -ti :3000 | xargs kill -9
                    </pre>
                  </div>

                  {/* Copyable Command 2 */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-charcoal/60 mb-1">
                      <span>Inspect process ID (PID):</span>
                      <button
                        onClick={() => handleCopy('lsof -i :3000')}
                        className="flex items-center gap-1 text-orange hover:underline font-bold"
                      >
                        {copied === 'lsof -i :3000' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-teal" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="bg-charcoal text-cream p-3 text-xs font-mono overflow-x-auto border border-charcoal">
                      lsof -i :3000
                    </pre>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* FAQ Accordion Section for Answer Engines */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-16"
              id="faq"
            >
              <div className="flex items-center gap-3 mb-6 border-b-4 border-charcoal pb-2">
                <HelpCircle className="w-7 h-7 text-teal" strokeWidth={2.5} />
                <h2 className="font-display text-3xl uppercase text-charcoal">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-charcoal bg-cream p-6 shadow-[2px_2px_0px_0px_#2D2D2D]">
                  <h3 className="font-display text-xl uppercase text-charcoal mb-2">
                    Why do ports like 3000 or 8080 get stuck on macOS?
                  </h3>
                  <p className="text-charcoal/80 text-sm leading-relaxed">
                    When you terminate a local dev server (like Next.js or Vite) using Ctrl+C or when an IDE crashes, the parent process may terminate while child worker threads or orphaned sockets remain alive in the background, holding onto the TCP socket.
                  </p>
                </div>

                <div className="border-2 border-charcoal bg-cream p-6 shadow-[2px_2px_0px_0px_#2D2D2D]">
                  <h3 className="font-display text-xl uppercase text-charcoal mb-2">
                    Why shouldn&apos;t I just run &quot;killall node&quot;?
                  </h3>
                  <p className="text-charcoal/80 text-sm leading-relaxed">
                    Running <code className="bg-charcoal text-cream px-1.5 py-0.5 font-mono text-xs">killall node</code> kills <em>all</em> Node.js processes running on your computer—including your code editor LSP servers, other projects, ESLint daemons, and background tasks. Kill9 targets only the specific process holding that port.
                  </p>
                </div>

                <div className="border-2 border-charcoal bg-cream p-6 shadow-[2px_2px_0px_0px_#2D2D2D]">
                  <h3 className="font-display text-xl uppercase text-charcoal mb-2">
                    How does Kill9 safely terminate processes?
                  </h3>
                  <p className="text-charcoal/80 text-sm leading-relaxed">
                    Kill9 uses a two-stage termination sequence. It issues a gentle <code className="bg-charcoal text-cream px-1.5 py-0.5 font-mono text-xs">SIGTERM</code> first, giving the server time to cleanly close SQLite/Postgres connections and flush logs. If the process does not terminate within the timeout, it sends <code className="bg-charcoal text-cream px-1.5 py-0.5 font-mono text-xs">SIGKILL</code> (kill -9).
                  </p>
                </div>

                <div className="border-2 border-charcoal bg-cream p-6 shadow-[2px_2px_0px_0px_#2D2D2D]">
                  <h3 className="font-display text-xl uppercase text-charcoal mb-2">
                    Does Kill9 consume battery or CPU while idle?
                  </h3>
                  <p className="text-charcoal/80 text-sm leading-relaxed">
                    No. Kill9 has 0% idle CPU usage. Unlike background polling daemons, it only queries the macOS kernel TCP listener table when you click the menu bar status item.
                  </p>
                </div>
              </div>
            </motion.section>
          </>
        )}
      </div>
    </div>
  );
}

