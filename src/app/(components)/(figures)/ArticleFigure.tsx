import type {ArticleModel} from '@/types/ModelTypes';

import Image from 'next/image';
import Link from 'next/link';
import {twJoin} from 'tailwind-merge';

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

                <figcaption className={twJoin(
                    'absolute inset-x-0 bottom-0 transition-opacity group-hover:opacity-0',
                    'flex h-full flex-col justify-between',
                    'bg-black/25 text-white'
                )}>

                    <h1 className={twJoin(
                        'label bg-secondary transition-opacity dark:bg-secondaryDark',
                        'line-clamp-2 font-code text-sm font-black capitalize text-black dark:text-white md:text-xl'
                    )}>
                        {article.title}
                    </h1>

                    <div className="flex flex-col">
                        <p className={twJoin(
                            'bg-white/75 px-2 text-black dark:bg-black/75 dark:text-white',
                            'line-clamp-3 font-code text-xs font-normal text-white md:text-base'
                        )}>
                            {article.excerpt}
                        </p>

                        <span className={twJoin(
                            'label',
                            'text-center font-code text-xs text-black'
                        )}>Published: {calculatePublishedTimestamp(article.published_at, true)}</span>
                    </div>
                </figcaption>
            </figure>
        </Link>
    );
};

export default ArticleFigure;