'use client';

import { FaArrowCircleLeft } from 'react-icons/fa';

import { useRouter } from 'next/navigation';

interface NavigationHelpersProps {}

export const NavigationHelpers = (props: NavigationHelpersProps) => {
  return (
    <div className="sticky top-[theme(spacing.header-mobile)] z-10 flex justify-between sm:top-[calc(theme(spacing.header-desktop)_+_theme(spacing.2))]">
      <GoBackButton />
      <BackToTopButton />
    </div>
  );
};

const GoBackButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <button
      className="label mb-2 flex items-center gap-2 font-digital text-xl transition-colors hover-focus:bg-secondary-active md:text-2xl"
      onClick={goBack}>
      <FaArrowCircleLeft />
      <span>Go back</span>
    </button>
  );
};

const BackToTopButton = () => {
  const scrollToTop = () => {
    let scrollY = window.scrollY;
    const interval = setInterval(() => {
      if (scrollY === window.scrollY) {
        clearInterval(interval);
        window.scrollTo({
          top: 0
        });
      }
      scrollY = window.scrollY;
    }, 100);
  };

  return (
    <button
      className="label mb-2 flex items-center gap-2 font-digital text-xl transition-colors hover-focus:bg-secondary-active md:text-2xl"
      onClick={scrollToTop}>
      <span>Back top top</span>
    </button>
  );
};
