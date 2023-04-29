import type {CourseModel} from '@/types/ModelTypes';

import {courseRoute} from '@/routes/local-routes';
import c from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import {Keyboard, Navigation, Pagination, Autoplay} from 'swiper';
import type {SwiperProps} from 'swiper/react';
import {Swiper, SwiperSlide} from 'swiper/react';

import calculatePublishedTimestamp from '@/functions/calculatePublishedTimestamp';

const CourseSwiper = ({ title, courses }: { title: string, courses: CourseModel[] }) => {
    const breakpoints: SwiperProps['breakpoints'] = {
        0: {
            slidesPerGroup: 1
        },
        640: {
            slidesPerGroup: 2
        }
    };

    return (
        <section className="relative z-10">
            <h1 className="flex items-center justify-center gap-32 overflow-hidden py-1 md:py-2 text-center bg-secondary font-digital dark:bg-secondaryDark dark:text-white text-xl md:text-4xl">
                {title}
            </h1>
            <div className="relative md:px-10">
                <Swiper breakpoints={breakpoints}
                        className="md:static"
                        keyboard={{ onlyInViewport: true }}
                        modules={[Keyboard, Navigation, Pagination, Autoplay]}
                        navigation={{ prevEl: '#previous-slide', nextEl: '#next-slide' }}
                        preventInteractionOnTransition={true}
                        slidesPerView="auto"
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

                    {courses.map((course) => (
                        <SwiperSlide key={course.id} className="w-full sm:w-[25vw] aspect-video">
                            <Figure course={course}/>
                        </SwiperSlide>
                    ))}

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

const Figure = ({ course }: { course: CourseModel }) => {
    return (
        <Link  href={courseRoute(course)}>
            <figure className="relative w-full h-full overflow-hidden">
                <Image fill
                       alt={course.title}
                       src={course.banner.original_url}
                       style={{ objectFit: 'cover' }}
                />
                <figcaption className={c(
                    'absolute inset-x-0 bottom-0 p-2',
                    'h-full transition-opacity',
                    'flex flex-col justify-end gap-1'
                )}>
                    <span className="text-xs w-min whitespace-nowrap label py-1 px-4">Published: {calculatePublishedTimestamp(course.published_at, true)}</span>
                </figcaption>
            </figure>
        </Link>
    );
};
export default CourseSwiper;