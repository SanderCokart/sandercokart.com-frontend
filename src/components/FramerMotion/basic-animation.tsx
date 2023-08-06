import { motion } from 'framer-motion';

import type { PropsWithChildren } from 'react';
import type { HTMLMotionProps, MotionProps, Variants } from 'framer-motion';

interface BasicAnimationProps extends HTMLMotionProps<'div'> {
  variants: Variants;
}

const BasicAnimation = ({ children, variants, className, ...restOfProps }: BasicAnimationProps) => {
  return (
    <motion.div
      animate="visible"
      className={className}
      exit="exit"
      initial="hidden"
      variants={variants}
      {...restOfProps}>
      {children}
    </motion.div>
  );
};

export default BasicAnimation;
