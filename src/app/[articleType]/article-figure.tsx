import moment from 'moment';

import Image from 'next/image';
import Link from 'next/link';

import type { ArticleModel } from '@/types/ModelTypes';

import calculatePublishedTimestamp from '@/functions/shared/calculatePublishedTimestamp';
import { cn } from '@/functions/shared/utils';

import { localArticleRoute } from '@/routes/local-routes';

interface ArticleFigureProps {
  article: ArticleModel;
}

export const ArticleFigure = ({ article }: ArticleFigureProps) => (
  <Link className="group pointer-events-auto flex h-full" href={localArticleRoute(article.type.name, article.slug)}>
    <figure className="relative flex flex-col">
      <div className="relative aspect-video h-full w-full overflow-hidden">
        <Image
          fill
          alt={article.title}
          className="transition-transform group-hover:scale-110"
          src={article.banner.original_url}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <figcaption className={cn('flex h-full flex-col justify-between bg-black/25 text-white')}>
        <h1
          className={cn(
            'bg-primary px-2 text-secondary-foreground',
            'font-code text-sm font-black capitalize md:text-xl',
            'line-clamp-2',
          )}
          title={article.title}>
          {article.title}
        </h1>

        <div className="flex flex-col p-4 text-black dark:text-white">
          <p className="line-clamp-5 font-code text-xs font-normal md:text-base" title={article.description}>
            {article.description}
          </p>
        </div>

        <span
          className="bg-secondary text-center font-code text-secondary-foreground"
          title={moment(article.published_at).calendar()}>
          Published: {calculatePublishedTimestamp(article.published_at, true)}
        </span>
      </figcaption>
    </figure>
  </Link>
);
