import type { Animation } from '@/types/CommonTypes';

export const animateHeightAuto = (height = 'auto'): Animation => ({
  variants: {
    hidden: { height: 0, transition: { duration: 0.15 } },
    visible: { height, transition: { duration: 0.15 } },
    exit: { height: 0, transition: { duration: 0.15 } }
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit'
});
