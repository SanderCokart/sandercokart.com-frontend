'use client';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Keyboard, Mousewheel, Navigation, Scrollbar } from 'swiper/modules';
import { Swiper } from 'swiper/react';

import React from 'react';

import type { ButtonHTMLAttributes } from 'react';
import type { ArticleModel } from '@/types/ModelTypes';
import type { SwiperProps } from 'swiper/react';

import { SwiperSlide } from '@/components/client';

import { cn } from '@/functions/shared/utils';

import { ArticleSlideItem } from '@/app/(components)/slides/ArticleSlideItem';

interface ArticleSwiperProps {
  articles: ArticleModel[];
}

const ArticleSwiper = ({ articles }: ArticleSwiperProps) => {
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
    <Swiper
      breakpoints={breakpoints}
      className="!px-14 !py-4"
      keyboard={{ onlyInViewport: true }}
      modules={[Keyboard, Navigation, Mousewheel, Scrollbar]}
      mousewheel={{ forceToAxis: true }}
      navigation={{ prevEl: '#previous-slide', nextEl: '#next-slide' }}
      preventInteractionOnTransition={true}
      slidesPerView="auto">
      {articles.map(article => (
        <SwiperSlide
          key={article.id}
          className="aspect-video overflow-hidden border-primary sm:max-w-[min(578px,100%)] sm:border-4">
          <ArticleSlideItem article={article} />
        </SwiperSlide>
      ))}
      <ArrowButton id="previous-slide" name="Previous image" side="left" title="previous slide" />
      <ArrowButton id="next-slide" name="Next image" side="right" title="next slide" />
    </Swiper>
  );
};

interface ArrowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  side: 'left' | 'right';
}

const ArrowButton = ({ id, name, title, side }: ArrowButtonProps) => {
  const Icon = side === 'left' ? FaArrowLeft : FaArrowRight;

  return (
    <button
      className={cn(
        'hidden md:grid',
        'absolute z-10 cursor-pointer place-items-center',
        'transition-colors disabled:pointer-events-none',
        'bg-primary enabled:hover:bg-accent enabled:hover:text-accent-foreground disabled:bg-black',
        'inset-y-0',
        side === 'left' ? 'left-0' : 'right-0',
        'w-6 md:w-10',
      )}
      id={id}
      name={name}
      title={title}
      type="button">
      <Icon />
    </button>
  );
};

export { ArticleSwiper };
