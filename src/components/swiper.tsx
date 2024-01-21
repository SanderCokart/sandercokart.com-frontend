'use client';

import { Mousewheel } from 'swiper/modules';
import { Swiper as BaseSwiper, SwiperSlide as BaseSwiperSlide } from 'swiper/react';

import type { SwiperProps as BaseSwiperProps, SwiperSlideProps as BaseSwiperSlideProps } from 'swiper/react';

interface SwiperProps extends BaseSwiperProps {}

const Swiper = (props: SwiperProps) => {
  props.modules = [Mousewheel];

  return <BaseSwiper {...props} />;
};

interface SwiperSlideProps extends BaseSwiperSlideProps {}

const SwiperSlide = (props: SwiperSlideProps) => {
  return <BaseSwiperSlide {...props} />;
};

export { Swiper, SwiperSlide };
