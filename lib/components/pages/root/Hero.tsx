import {useLocalStorage} from '@mantine/hooks';
import c from 'classnames';
import {motion, AnimatePresence} from 'framer-motion';
import Image from 'next/image';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import {MdSwipeLeft} from 'react-icons/md';
import {Keyboard, Navigation, Pagination, Autoplay} from 'swiper';
import type {SwiperProps} from 'swiper/react';
import {Swiper, SwiperSlide} from 'swiper/react';

import {fade} from '@/constants/animations/fade';

import useDev from '@/hooks/useDev';
import useMounted from '@/hooks/useMounted';

import DemoImage from '@/public/static/images/516-500x300.jpg';

const breakpoints: SwiperProps['breakpoints'] = {
    0: {
        slidesPerView: 1.1,
        spaceBetween: 0
    },
    640: {
        slidesPerView: 1.1,
        spaceBetween: 0
    },
    768: {
        slidesPerView: 2.1,
        spaceBetween: 16
    },
    // 1024: {
    //     slidesPerView: 2
    // },
    1280: {
        slidesPerView: 3.1,
        spaceBetween: 16
    }
    // 1536: {
    //     slidesPerView: 4
    // }
};

const Figure = () => (
    <figure className="relative h-[200px] md:h-[250px]">
        <Image fill
               alt="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, suscipit."
               src={DemoImage}
               style={{ objectFit: 'cover' }}
        />
        <figcaption className={c(
            'absolute inset-x-0 bottom-0 p-2',
            'min-h-[92px] max-h-[92px] md:min-h-[110px] md:max-h-[110px]',
            'flex flex-col gap-1',
            'dark:bg-black/75 bg-white/75 text-black dark:text-white'
        )}>
            <h1 className="text-xl font-black capitalize line-clamp-1">Something long term review adasa sad asd a</h1>
            <p className="text-sm line-clamp-2 md:line-clamp-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At beatae consectetur debitis doloremque ea eaque excepturi id illum odit officia placeat porro, quae quidem suscipit voluptas! Error incidunt neque quia?
            </p>
        </figcaption>
    </figure>
);

const TouchNotification = () => {
    const [touched, setTouched] = useLocalStorage({ key: 'swipe-tutorial', defaultValue: false });
    const { mounted } = useMounted();

    useDev(() => {
        setTouched(false);
    });

    if (mounted)
        return (
            <AnimatePresence mode="wait">
                {!touched && (
                    <motion.div animate="visible"
                                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 bg-black/75 md:hidden"
                                exit="exit"
                                initial="hidden"
                                variants={{ ...fade, exit: { ...fade.exit, pointerEvents: 'none' } }}
                                onTouchStart={() => setTouched(true)}>
                        <p className="text-center text-2xl uppercase text-white font-digital">
                            Swipe to see more
                        </p>
                        <MdSwipeLeft className="col-start-2 text-7xl"/>
                    </motion.div>
                )}
            </AnimatePresence>
        );

    return null;
};

const SwiperSection = ({ title }: { title: string }) => {
    return (
        <section className="relative z-10">
            <h1 className="flex items-center justify-center gap-32 overflow-hidden py-2 text-center bg-secondary font-digital dark:bg-secondaryDark dark:text-white md:text-4xl">
                {title}
            </h1>
            <div className="relative md:px-10">
                <Swiper breakpoints={breakpoints}
                        className="md:static"
                        cssMode={true}
                        keyboard={{ onlyInViewport: true }}
                        modules={[Keyboard, Navigation, Pagination, Autoplay]}
                        navigation={{ prevEl: '#previous-slide', nextEl: '#next-slide' }}
                        preventInteractionOnTransition={true}
                >
                    <button
                        className={c(
                            'z-10 absolute grid place-items-center cursor-pointer text-white',
                            'transition-opacity transition-colors',
                            'disabled:bg-black bg-primaryDark',
                            'enabled:hover:bg-primary',
                            'md:inset-y-0 md:w-10 md:left-0'
                        )}
                        id="previous-slide"
                        name="Previous image"
                        type="button">
                        <FaArrowLeft/>
                    </button>

                    <SwiperSlide>
                        <Figure/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Figure/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Figure/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Figure/>
                    </SwiperSlide>

                    <button
                        className={c(
                            'z-10 absolute grid place-items-center cursor-pointer text-white',
                            'transition-opacity transition-colors',
                            'disabled:bg-black bg-primaryDark',
                            'enabled:hover:bg-primary',
                            'md:inset-y-0 md:w-10 md:right-0'
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

export default function Hero() {
    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 1,
                staggerDirection: -1
            }
        }
    };

    const item = {
        hidden: { height: 0, transition: { duration: 1 } },
        show: { height: 'auto', transition: { duration: 1 } }
    };

    return (
        <div className="flex flex-col section-no-padding" id="hero">
            <TouchNotification/>
            <motion.div
                animate="show"
                initial="hidden"
                variants={container}
            >
                <motion.div className="relative" variants={item}>
                    <SwiperSection title="General"/>
                </motion.div>
                <motion.div className="relative" variants={item}>
                    <SwiperSection title="Courses"/>
                </motion.div>
                <motion.div className="relative" variants={item}>
                    <SwiperSection title="Tips"/>
                </motion.div>
            </motion.div>
        </div>
    );
}
