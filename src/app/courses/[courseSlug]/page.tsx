import Image from 'next/image';
import Link from 'next/link';

import { NavigationHelpers } from '@/app/components';

import { getCourse } from '@/functions/server/api';
import { calculatePublishedTimestamp } from '@/functions/shared/utils';
import { localCourseArticleRoute } from '@/routes/local-routes';

interface PageProps {
  params: {
    courseSlug: string;
  };
}

export default async function CoursePage({ params: { courseSlug } }: PageProps) {
  const { title, banner, published_at, articles } = await getCourse(courseSlug);

  return (
    <main className="min-h-main p-4 md:p-8">
      <div className="mx-auto max-w-screen-lg">
        <NavigationHelpers />
        <div className="relative aspect-[3/2]">
          <Image
            fill
            priority
            alt={banner.file_name}
            src={banner.original_url}
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-x-0 top-0 flex justify-between p-2 font-code text-xs font-bold md:text-xl">
            <span className="label hidden lg:inline-block">
              Published: {calculatePublishedTimestamp(published_at)}
            </span>
            <span
              className="label lg:hidden"
              title={`Published: ${calculatePublishedTimestamp(published_at)}`}>
              Published: {calculatePublishedTimestamp(published_at, true)}
            </span>
          </div>
        </div>
        <ul>
          {/*TODO*/}
          {articles.map(({ id, title, slug: articleSlug, published_at, excerpt }) => (
            <li key={id} className="py-4">
              <Link href={localCourseArticleRoute(courseSlug, articleSlug)}>
                <div className="space-y-4">
                  <h2 className="font-digital text-2xl font-bold">{title}</h2>
                  <span className="label">
                    Published: {calculatePublishedTimestamp(published_at)}
                  </span>
                  <p>{excerpt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
