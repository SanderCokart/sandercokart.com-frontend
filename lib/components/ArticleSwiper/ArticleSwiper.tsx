import type {ArticleModel} from '@/types/ModelTypes';

import c from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import {Keyboard, Navigation, Pagination, Autoplay} from 'swiper';
import type {SwiperProps} from 'swiper/react';
import {Swiper, SwiperSlide} from 'swiper/react';

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
        spaceBetween: 0
    },
    // 1024: {
    //     slidesPerView: 2
    // },
    1280: {
        slidesPerView: 3.1,
        spaceBetween: 0
    }
    // 1536: {
    //     slidesPerView: 4
    // }
};

const ArticleSwiper = ({ title, articles }: { title: string, articles: ArticleModel[] }) => {
    return (
        <section className="relative z-10">
            <h1 className="flex items-center justify-center gap-32 overflow-hidden py-1 md:py-2 text-center bg-secondary font-digital dark:bg-secondaryDark dark:text-white text-xl md:text-4xl">
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

                    {articles.map((article) => (
                        <SwiperSlide key={article.id}>
                            <Figure article={article}/>
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

const Figure = ({ article }: { article: ArticleModel }) => (
    <Link href={`/articles/${article.type.name}/${article.slug}`}>
        <figure className="relative [&_img]:blur-sm [&_img]:hover:blur-md h-[200px] md:h-[250px] overflow-hidden">
            <Image fill
                   alt={article.banner.file_name}
                   src={article.banner.original_url}
                   style={{ objectFit: 'cover' }}
            />
            <figcaption className={c(
                'absolute inset-x-0 bottom-0 p-2 md:p-8',
                'h-full',
                'opacity-75 active:opacity-0 hover:opacity-90 transition-opacity',
                'flex flex-col justify-between gap-1',
                'dark:bg-black bg-white text-black dark:text-white'
            )}>
                <h1 className="text-xl font-black capitalize line-clamp-1">{article.title}</h1>
                <p className="text-sm line-clamp-2 md:line-clamp-3">
                    {article.excerpt}
                </p>
                <span className="text-xs">Published: 2-4-2023</span>
            </figcaption>
        </figure>
    </Link>
);
export default ArticleSwiper;