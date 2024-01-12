import type { ArticleModel } from "@/types/ModelTypes";

import { localArticleRoute } from "@/routes/local-routes";
import Image from "next/image";
import Link from "next/link";

import calculatePublishedTimestamp from "@/functions/shared/calculatePublishedTimestamp";
import { cn } from "@/functions/shared/utils";

interface ArticleFigureProps {
  article: ArticleModel;
}

export const ArticleFigure = ({ article }: ArticleFigureProps) => (
  <Link
    key={article.id}
    className="group pointer-events-auto"
    href={localArticleRoute(article.type.name, article.slug)}
  >
    <figure className="relative flex flex-col border-2 border-secondary transition-transform hover:scale-95 dark:border-secondaryDark">
      <div className="relative aspect-video h-full w-full overflow-hidden">
        <Image
          fill
          alt={article.title}
          className="transition-transform group-hover:scale-110"
          src={article.banner.original_url}
          style={{ objectFit: "cover" }}
        />
      </div>

      <figcaption
        className={cn(
          "flex h-full flex-col justify-between",
          "bg-black/25 text-white",
        )}
      >
        <h1
          className={cn(
            "label bg-secondary transition-opacity dark:bg-secondaryDark",
            "line-clamp-2 font-code text-sm font-black capitalize text-black dark:text-white md:text-xl",
          )}
        >
          {article.title}
        </h1>

        <div
          className={cn(
            "flex flex-col p-4",
            "bg-bodyLightSecondary text-black dark:bg-bodyDarkSecondary dark:text-white",
          )}
        >
          <p className="line-clamp-5 font-code text-xs font-normal md:text-base">
            {article.excerpt}
          </p>
        </div>

        <span
          className={cn(
            "label shadow-none",
            "text-center font-code text-xs text-black",
          )}
        >
          Published: {calculatePublishedTimestamp(article.published_at, true)}
        </span>
      </figcaption>
    </figure>
  </Link>
);
