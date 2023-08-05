import { twJoin } from 'tailwind-merge';

import Image from 'next/image';
import Link from 'next/link';

import type { ArticleModel } from '@/types/ModelTypes';

import { calculatePublishedTimestamp } from '@/functions/shared/utils';
import { localArticleRoute } from '@/routes/local-routes';

export const ArticleFigure = ({ article }: { article: ArticleModel }) => (
  <Link className="group" href={localArticleRoute(article.type.name, article.slug)}>
    <figure className="relative h-full w-full overflow-hidden">
      <Image
        fill
        alt={article.title}
        className="transition-transform group-hover:scale-110"
        src={article.banner.original_url}
        style={{ objectFit: 'cover' }}
      />
      <div className="absolute inset-0 backdrop-blur-[2px] group-hover:backdrop-blur-none" />

      <figcaption
        className={twJoin(
          'absolute inset-x-0 bottom-0 transition-opacity group-hover:opacity-0',
          'flex h-full flex-col justify-between',
          'bg-black/25 text-white'
        )}>
        <h1
          className={twJoin(
            'label bg-secondary transition-opacity ',
            'line-clamp-2 font-code text-sm font-black capitalize text-black md:text-xl'
          )}>
          {article.title}
        </h1>

        <div className="flex flex-col">
          <p className="line-clamp-3 bg-muted/75 px-2 font-code text-xs font-normal md:text-base">
            {article.excerpt}
          </p>

          <span className="label text-center font-code text-xs text-black">
            Published: {calculatePublishedTimestamp(article.published_at, true)}
          </span>
        </div>
      </figcaption>
    </figure>
  </Link>
);
