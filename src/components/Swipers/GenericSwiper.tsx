'use client';

import { FaArrowCircleRight, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Grid, Keyboard, Mousewheel, Navigation } from 'swiper';
import { Swiper } from 'swiper/react';
import { twJoin } from 'tailwind-merge';

import Link from 'next/link';

import type { ReactNode } from 'react';
import type { SwiperProps } from 'swiper/react';

interface GenericSwiperProps {
  title: string;
  children: ReactNode;
  moreHref: string;
}

const Header = (props: { title: string; href: string }) => (
  <h1
    className={twJoin(
      'flex items-center justify-center gap-32',
      'bg-secondary text-secondary-foreground transition-colors',
      'py-1 md:py-2',
      'overflow-hidden font-digital',
      'text-center text-xl md:text-4xl'
    )}>
    <span className="flex w-5/6 items-center justify-between">
      <span className="grow">{props.title}</span>
      <Link className="flex items-center gap-2" href={props.href}>
        more <FaArrowCircleRight />
      </Link>
    </span>
  </h1>
);

export const GenericSwiper = ({ title, children, moreHref }: GenericSwiperProps) => {
  const breakpoints: SwiperProps['breakpoints'] = {
    0: {
      slidesPerGroup: 1,
      spaceBetween: 8,
      centeredSlides: true
    },
    640: {
      slidesPerGroup: 2,
      spaceBetween: 64,
      centeredSlides: false
    }
  };

  return (
    <section className="relative z-10 shadow-2xl">
      <Header href={moreHref} title={title} />
      <div className="bg-body-muted relative border-secondary py-4 md:p-8">
        <Swiper
          breakpoints={breakpoints}
          className="px-6 md:static md:px-10"
          keyboard={{ onlyInViewport: true }}
          modules={[Keyboard, Navigation, Mousewheel]}
          mousewheel={{ forceToAxis: true }}
          navigation={{ prevEl: '#previous-slide', nextEl: '#next-slide' }}
          preventInteractionOnTransition={true}
          slidesPerView="auto">
          <button
            className={twJoin(
              'hidden transition-colors md:grid',
              'absolute z-10 cursor-pointer place-items-center text-white',
              'disabled:pointer-events-none',
              'bg-primary enabled:hover:bg-primary-active disabled:bg-muted',
              'inset-y-0 left-0 w-6 md:w-10'
            )}
            id="previous-slide"
            name="Previous image"
            type="button">
            <FaArrowLeft />
          </button>

          {children}

          <button
            className={twJoin(
              'hidden transition-colors md:grid',
              'sr-only not-sr-only',
              'absolute z-10 cursor-pointer place-items-center text-white',
              'disabled:pointer-events-none',
              'bg-primary disabled:bg-muted',
              'enabled:hover:bg-primary-active',
              'inset-y-0 right-0 w-6 md:w-10'
            )}
            id="next-slide"
            name="Next image"
            type="button">
            <FaArrowRight />
          </button>
        </Swiper>
      </div>
    </section>
  );
};

export default GenericSwiper;
