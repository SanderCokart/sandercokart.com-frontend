import type {ReactNode} from 'react';

import c from 'classnames';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import {Keyboard, Navigation, Mousewheel} from 'swiper';
import type {SwiperProps} from 'swiper/react';
import {Swiper} from 'swiper/react';

const ArticleSwiper = ({ title, children }: { title: string, children: ReactNode }) => {
    const breakpoints: SwiperProps['breakpoints'] = {
        0: {
            slidesPerGroup: 1
        },
        640: {
            slidesPerGroup: 2
        }
    };

    return (
        <section className="relative z-10 shadow-2xl border-b-8 border-secondary dark:border-secondaryDark">
            <h1 className={c(
                'flex items-center justify-center gap-32',
                'bg-secondary dark:bg-secondaryDark',
                'py-1 md:py-2',
                'font-digital overflow-hidden',
                'text-center text-xl md:text-4xl text-black dark:text-white'
            )}>
                {title}
            </h1>
            <div className="relative border-secondary dark:border-secondaryDark bg-bodyLightSecondary dark:bg-bodyDarkSecondary md:pt-8 md:px-8">
                <Swiper breakpoints={breakpoints}
                        className="px-6 md:static md:px-10"
                        keyboard={{ onlyInViewport: true }}
                        modules={[Keyboard, Navigation, Mousewheel]}
                        mousewheel={{ forceToAxis: true }}
                        navigation={{ prevEl: '#previous-slide', nextEl: '#next-slide' }}
                        preventInteractionOnTransition={true}
                        slidesPerView="auto"
                        spaceBetween={64}
                >
                    <button
                        className={c(
                            'z-10 absolute grid place-items-center cursor-pointer text-white',
                            'transition-colors disabled:pointer-events-none',
                            'bg-primaryDark disabled:bg-black enabled:hover:bg-primary',
                            'inset-y-0 w-6 md:w-10 left-0'
                        )}
                        id="previous-slide"
                        name="Previous image"
                        type="button">
                        <FaArrowLeft/>
                    </button>

                    {children}

                    <button
                        className={c(
                            'sr-only not-sr-only',
                            'z-10 absolute grid place-items-center cursor-pointer text-white',
                            'transition-colors disabled:pointer-events-none',
                            'disabled:bg-black bg-primary dark:bg-primaryDark',
                            'enabled:hover:bg-primaryDark dark:enabled:hover:bg-primary',
                            'inset-y-0 w-6 md:w-10 right-0'
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

export default ArticleSwiper;