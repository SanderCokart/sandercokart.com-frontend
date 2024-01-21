'use client';

import { FaArrowCircleRight, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Keyboard, Mousewheel, Navigation, Scrollbar } from 'swiper/modules';
import { Swiper } from 'swiper/react';

import Link from 'next/link';

import type { ReactNode } from 'react';
import type { SwiperProps } from 'swiper/react';

import { cn } from '@/functions/shared/utils';

interface GenericSwiperProps {
  title: string;
  children: ReactNode;
  moreHref: string;
}

const GenericSwiper = ({ title, children, moreHref }: GenericSwiperProps) => {
  const breakpoints: SwiperProps['breakpoints'] = {
    0: {
      slidesPerGroup: 1,
      spaceBetween: 8,
      centeredSlides: true,
    },
    640: {
      slidesPerGroup: 2,
      spaceBetween: 64,
      centeredSlides: false,
    },
  };

  return (
    <section className="relative z-10 shadow-2xl">
      <h1
        className={cn(
          'flex items-center justify-center gap-32',
          'bg-secondary',
          'py-1 md:py-2',
          'overflow-hidden font-digital',
          'text-center text-xl text-black dark:text-white md:text-4xl',
        )}>
        <span className="flex w-5/6 items-center justify-between">
          <span className="grow">{title}</span>
          <Link className="flex items-center gap-2" href={moreHref}>
            more <FaArrowCircleRight />
          </Link>
        </span>
      </h1>
      <div className="relative">
        <Swiper
          breakpoints={breakpoints}
          className="!px-14 !py-4"
          keyboard={{ onlyInViewport: true }}
          modules={[Keyboard, Navigation, Mousewheel, Scrollbar]}
          mousewheel={{ forceToAxis: true }}
          navigation={{ prevEl: '#previous-slide', nextEl: '#next-slide' }}
          preventInteractionOnTransition={true}
          slidesPerView="auto">
          {children}
          <button
            className={cn(
              'hidden md:grid',
              'absolute z-10 cursor-pointer place-items-center',
              'transition-colors disabled:pointer-events-none',
              'bg-primary enabled:hover:bg-accent enabled:hover:text-accent-foreground disabled:bg-black',
              'inset-y-0 left-0 w-6 md:w-10',
            )}
            id="previous-slide"
            name="Previous image"
            title="previous slide"
            type="button">
            <FaArrowLeft />
          </button>
          <button
            className={cn(
              'hidden md:grid',
              'absolute z-10 cursor-pointer place-items-center',
              'transition-colors disabled:pointer-events-none',
              'bg-primary enabled:hover:bg-accent enabled:hover:text-accent-foreground disabled:bg-black',
              'inset-y-0 right-0 w-6 md:w-10',
            )}
            id="next-slide"
            name="Next image"
            title="next slide"
            type="button">
            <FaArrowRight />
          </button>
        </Swiper>
      </div>
    </section>
  );
};

export default GenericSwiper;
