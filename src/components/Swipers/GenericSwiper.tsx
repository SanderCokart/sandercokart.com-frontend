'use client';
import type {ReactNode} from 'react';

import Link from 'next/link';
import {FaArrowLeft, FaArrowRight, FaArrowCircleRight} from 'react-icons/fa';
import {Keyboard, Navigation, Mousewheel} from 'swiper';
import type {SwiperProps} from 'swiper/react';
import {Swiper} from 'swiper/react';
import {twJoin} from 'tailwind-merge';

interface GenericSwiperProps {
    title: string;
    children: ReactNode;
    moreHref: string;
}

const GenericSwiper = ({ title, children, moreHref }: GenericSwiperProps) => {
    const breakpoints: SwiperProps['breakpoints'] = {
        0:   {
            slidesPerGroup: 1,
            spaceBetween:   8,
            centeredSlides: true
        },
        640: {
            slidesPerGroup: 2,
            spaceBetween:   64,
            centeredSlides: false
        }
    };

    return (
        <section className="relative z-10 shadow-2xl">
            <h1 className={twJoin(
                'flex items-center justify-center gap-32',
                'bg-secondary dark:bg-secondaryDark',
                'py-1 md:py-2',
                'overflow-hidden font-digital',
                'text-center text-xl text-black dark:text-white md:text-4xl'
            )}>
                <span className="flex w-5/6 items-center justify-between">
                    <span className="grow">{title}</span>
                    <Link className="flex items-center gap-2" href={moreHref}>more <FaArrowCircleRight/></Link>
                </span>
            </h1>
            <div className="relative border-secondary bg-bodyLightSecondary py-4 dark:border-secondaryDark dark:bg-bodyDarkSecondary md:p-8">
                <Swiper breakpoints={breakpoints}
                        className="px-6 md:static md:px-10"
                        keyboard={{ onlyInViewport: true }}
                        modules={[Keyboard, Navigation, Mousewheel]}
                        mousewheel={{ forceToAxis: true }}
                        navigation={{ prevEl: '#previous-slide', nextEl: '#next-slide' }}
                        preventInteractionOnTransition={true}
                        slidesPerView="auto"
                >
                    <button
                        className={twJoin(
                            'hidden md:grid',
                            'absolute z-10 cursor-pointer place-items-center text-white',
                            'transition-colors disabled:pointer-events-none',
                            'bg-primaryDark enabled:hover:bg-primary disabled:bg-black',
                            'inset-y-0 left-0 w-6 md:w-10'
                        )}
                        id="previous-slide"
                        name="Previous image"
                        type="button">
                        <FaArrowLeft/>
                    </button>

                    {children}

                    <button
                        className={twJoin(
                            'hidden md:grid',
                            'sr-only not-sr-only',
                            'absolute z-10 cursor-pointer place-items-center text-white',
                            'transition-colors disabled:pointer-events-none',
                            'bg-primary disabled:bg-black dark:bg-primaryDark',
                            'enabled:hover:bg-primaryDark dark:enabled:hover:bg-primary',
                            'inset-y-0 right-0 w-6 md:w-10'
                        )}
                        id="next-slide"
                        name="Next image"
                        type="button">
                        <FaArrowRight/>
                    </button>
                </Swiper>
            </div>
        </section>
    );
};

export default GenericSwiper;