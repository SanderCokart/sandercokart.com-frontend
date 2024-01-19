'use client';

import { register } from 'swiper/element/bundle';

import { useEffect, useRef } from 'react';

import type { SwiperContainer } from 'swiper/element/bundle';
import type { SwiperProps, SwiperSlideProps } from 'swiper/react';
import type { SwiperOptions } from 'swiper/types';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': any;
      'swiper-slide': any;
    }
  }
}

export const Swiper = (props: SwiperProps) => {
  const swiperRef = useRef<SwiperContainer | null>(null);
  const { children, ...rest } = props;

  useEffect(() => {
    // Register Swiper web component
    register();

    // pass component props to parameters
    const params: SwiperOptions = {
      ...rest,
    };

    if (swiperRef.current) {
      // Assign it to swiper element
      Object.assign(swiperRef.current, params);
      // initialize swiper
      swiperRef.current.initialize();
    }
  }, []);

  return (
    <swiper-container ref={swiperRef} init="false">
      {children}
    </swiper-container>
  );
};

export const SwiperSlide = (props: SwiperSlideProps) => {
  const { children, ...rest } = props;

  return <swiper-slide {...rest}>{children}</swiper-slide>;
};
