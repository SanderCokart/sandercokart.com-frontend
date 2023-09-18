import type { Animation } from '@/types/CommonTypes';

export const animateHeightAuto = (params: { height?: string; duration?: number }): Animation => {
  const { height = 'auto', duration = 0.15 } = params;

  return {
    variants: {
      hidden: { height: 0, transition: { duration } },
      visible: { height, transition: { duration } },
      exit: { height: 0, transition: { duration }, paddingTop: 0, paddingBottom: 0 },
    },
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
  };
};
