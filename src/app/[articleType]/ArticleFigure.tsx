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
  <Link
    key={article.id}
    className="group pointer-events-auto"
    href={localArticleRoute(article.type.name, article.slug)}>
    <figure className="dark:border-secondaryDark relative flex flex-col border-2 border-secondary transition-transform hover:scale-95">
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
            'bg-secondary text-secondary-foreground',
            'font-code text-sm font-black capitalize  md:text-xl',
            'line-clamp-2',
          )}>
          {article.title}
        </h1>

        <div
          className={cn(
            'flex flex-col p-4',
            'bg-bodyLightSecondary dark:bg-bodyDarkSecondary text-black dark:text-white',
          )}>
          <p className="line-clamp-5 font-code text-xs font-normal md:text-base">{article.excerpt}</p>
        </div>

        <span className={cn('shadow-none', 'text-center font-code text-xs text-black')}>
          Published: {calculatePublishedTimestamp(article.published_at, true)}
        </span>
      </figcaption>
    </figure>
  </Link>
);
