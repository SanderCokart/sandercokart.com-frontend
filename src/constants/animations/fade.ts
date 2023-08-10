import type { Animation } from '@/types/CommonTypes';

export const animateFade: Animation = {
  variants: {
    hidden: { opacity: 0, transition: { duration: 0.15 } },
    visible: { opacity: 1, transition: { duration: 0.15 } },
    exit: { opacity: 0, transition: { duration: 0.15 } }
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit'
};

export const animateFadeWithDelay = (delay = 0): Animation => ({
  variants: {
    hidden: { opacity: 0, transition: { duration: 0.15 } },
    visible: { opacity: 1, transition: { duration: 0.15, delay } },
    exit: { opacity: 0, transition: { duration: 0.15 } }
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit'
});
