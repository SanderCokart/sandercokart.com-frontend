import type {ArticleModel} from '@/types/ModelTypes';

import c from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import calculatePublishedTimestamp from '@/functions/calculatePublishedTimestamp';

const ArticleFigure = ({ article, route }: { article: ArticleModel, route: string }) => {
    return (
        <Link className=" group" href={route}>
            <figure className="relative h-full w-full overflow-hidden">
                <Image fill
                       alt={article.title}
                       className="transition-transform group-hover:scale-110"
                       src={article.banner.original_url}
                       style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 backdrop-blur-[2px] group-hover:backdrop-blur-none"></div>

                <figcaption className={c(
                    'absolute inset-x-0 bottom-0 group-hover:opacity-0 transition-opacity',
                    'flex flex-col justify-between h-full',
                    'text-white bg-black/25'
                )}>

                    <h1 className={c(
                        'transition-opacity label bg-secondary dark:bg-secondaryDark',
                        'capitalize text-sm md:text-xl font-black font-code line-clamp-2 text-black dark:text-white'
                    )}>
                        {article.title}
                    </h1>

                    <div className="flex flex-col">
                        <p className={c(
                            'bg-white/75 dark:bg-black/75 text-black dark:text-white px-2',
                            'text-xs md:text-base text-white font-normal font-code line-clamp-3'
                        )}>
                            {article.excerpt}
                        </p>

                        <span className={c(
                            'label',
                            'text-center text-xs font-code text-black'
                        )}>Published: {calculatePublishedTimestamp(article.published_at, true)}</span>
                    </div>
                </figcaption>
            </figure>
        </Link>
    );
};

export default ArticleFigure;