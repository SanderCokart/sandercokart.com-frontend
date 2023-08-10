import type { Variants } from 'framer-motion';

export type ArticleType = 'general' | 'tips' | 'courses';

export type Animation = {
  variants: Variants;
  initial: string;
  animate: string;
  exit: string;
};
