import React from 'react';
import { motion } from 'framer-motion';

function page() {
  return (
    <main>
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        Onboarding
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        Welcome to the onboarding page!
      </motion.p>
    </main>
  );
}

export default page;