'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 150, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/20 to-green-500/20 rounded-full blur-3xl"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--foreground) 1px, transparent 1px),
            linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
