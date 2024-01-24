import moment from 'moment/moment';

import Image from 'next/image';
import Link from 'next/link';

import type { ArticleModel } from '@/types/ModelTypes';

import calculatePublishedTimestamp from '@/functions/shared/calculatePublishedTimestamp';
import { cn } from '@/functions/shared/utils';

import { localArticleRoute } from '@/routes/local-routes';

interface ArticleFigureProps {
  article: ArticleModel;
}

const ArticleSlideItem = ({ article }: ArticleFigureProps) => {
  return (
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

        <figcaption className="absolute inset-x-0 bottom-0 flex h-full flex-col justify-between">
          <h1
            className={cn(
              'bg-secondary text-secondary-foreground',
              'font-code text-sm font-black capitalize md:text-xl',
              'line-clamp-2 text-balance px-2',
            )}>
            {article.title}
          </h1>

          <div className="flex flex-col">
            <p className="line-clamp-3 bg-white/85 px-2 font-code text-xs font-normal text-black dark:bg-black/85 dark:text-white md:text-base">
              {article.excerpt}
            </p>

            <span
              className="bg-secondary p-2 py-1 font-code text-xs font-bold text-secondary-foreground"
              title={moment(article.published_at).calendar()}>
              Published: {calculatePublishedTimestamp(article.published_at, true)}
            </span>
          </div>
        </figcaption>
      </figure>
    </Link>
  );
};

export { ArticleSlideItem };
