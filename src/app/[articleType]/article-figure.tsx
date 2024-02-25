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
  <Link className="flex flex-col" href={localArticleRoute(article.type.name, article.slug)}>
    <figure className="relative flex grow flex-col">
      <div className="relative aspect-video overflow-hidden">
        <Image fill alt={article.title} className="object-cover" src={article.banner.original_url} />
      </div>

      <figcaption className="flex grow flex-col bg-black/50 text-white">
        <h1
          className={cn(
            'text-primary-foreground-foreground bg-primary',
            'font-code text-sm font-black capitalize md:text-xl',
            'line-clamp-2 px-2',
          )}
          title={article.title}>
          {article.title}
        </h1>

        <p className="line-clamp-5 grow p-4 font-code text-xs font-normal md:text-base" title={article.description}>
          {article.description}
        </p>

        <span
          className="bg-secondary text-center font-code text-secondary-foreground"
          title={moment(article.published_at).calendar()}>
          Published: {calculatePublishedTimestamp(article.published_at, true)}
        </span>
      </figcaption>
    </figure>
  </Link>
);
