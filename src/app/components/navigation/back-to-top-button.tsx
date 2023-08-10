'use client';

import { FaChevronUp } from 'react-icons/fa';

import { MotionButton } from '@/components/framer-motion';

import { animateWidth } from '@/constants/animations';
import useWindowOverflow from '@/hooks/useWindowOverflow';

interface BackToTopButtonProps {}

export const BackToTopButton = (props: BackToTopButtonProps) => {
  const { isOverflowing } = useWindowOverflow();

  if (!isOverflowing) return null;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0
    });
  };

  return (
    <MotionButton
      aria-label="back to top"
      className="grid w-nav-mobile place-items-center bg-secondary"
      title="Back to top"
      type="button"
      onClick={scrollToTop}
      {...animateWidth('56px')}
      exit={{}}>
      <FaChevronUp />
    </MotionButton>
  );
};
