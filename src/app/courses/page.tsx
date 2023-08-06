import Image from 'next/image';
import Link from 'next/link';

import type { CourseModel } from '@/types/ModelTypes';

import { getCourses } from '@/functions/server/api';
import { calculatePublishedTimestamp, cn } from '@/functions/shared/utils';
import { localCourseRoute } from '@/routes/local-routes';

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main className="min-h-main p-8">
      <div
        className={cn(
          'supports-[grid-template-rows:masonry]:grid-template-rows-[masonry] grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
          'pointer-events-none',
          '[&:hover_>*:hover]:opacity-100 [&:hover_>*]:opacity-30 [&_>*]:transition-opacity'
        )}>
        {courses.map(course => (
          <CourseFigure key={course.id} course={course} />
        ))}
      </div>
    </main>
  );
}

const CourseFigure = ({ course }: { course: CourseModel }) => {
  return (
    <Link className="group" href={localCourseRoute(course.slug)}>
      <figure className="pointer-events-auto relative flex flex-col rounded border-2 border-secondary">
        <div className="relative aspect-video h-full w-full overflow-hidden">
          <Image
            fill
            alt={course.title}
            className="transition-transform group-hover:scale-110"
            src={course.banner.original_url}
            style={{ objectFit: 'cover' }}
          />
        </div>

        <figcaption className="flex h-full flex-col justify-between bg-black/25 text-white">
          <h1
            className={cn(
              'label bg-secondary transition-opacity',
              'line-clamp-2 font-code text-sm font-black capitalize text-black md:text-xl'
            )}>
            {course.title}
          </h1>

          <div className="bg-bodyLightSecondary flex flex-col p-4 text-black dark:text-white">
            <p className="line-clamp-5 font-code text-xs font-normal  md:text-base">
              {course.description}
            </p>
          </div>

          <span className="label text-center font-code text-xs text-black shadow-none">
            Published: {calculatePublishedTimestamp(course.published_at, true)}
          </span>
        </figcaption>
      </figure>
    </Link>
  );
};
