'use client';

import { motion, useScroll } from 'framer-motion';

export const ScrollProgressIndicator = () => {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-primary" />
      <motion.div
        className="absolute bottom-0 left-0 h-1 w-full bg-secondary"
        style={{ scaleX: scrollYProgress }}
      />
    </>
  );
};
