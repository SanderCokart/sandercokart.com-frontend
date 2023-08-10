import type { Animation } from '@/types/CommonTypes';

export const animateWidth = (targetWidth: string | number = 'auto'): Animation => ({
  variants: {
    hidden: { width: 0, transition: { duration: 0.15 } },
    visible: { width: targetWidth, transition: { duration: 0.15 } },
    exit: { width: 0, transition: { duration: 0.15 } }
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit'
});
