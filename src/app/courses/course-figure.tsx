import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { CourseModel } from '@/types/ModelTypes';

import calculatePublishedTimestamp from '@/functions/shared/calculatePublishedTimestamp';
import { cn } from '@/functions/shared/utils';

import { localCourseRoute } from '@/routes/local-routes';

export const CourseFigure = ({ course }: { course: CourseModel }) => {
  return (
    <Link className="group pointer-events-auto" href={localCourseRoute(course.slug)}>
      <figure className="relative flex flex-col border-2 border-secondary transition-transform hover:scale-95">
        <div className="relative aspect-video h-full w-full overflow-hidden">
          <Image
            fill
            alt={course.title}
            className="transition-transform group-hover:scale-110"
            src={course.banner.original_url}
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
            {course.title}
          </h1>

          <div className={cn('flex flex-col p-4', 'bg-bodyLightSecondary dark:bg-bodyDarkSecondary text-black ')}>
            <p className="line-clamp-5 font-code text-xs font-normal md:text-base">{course.description}</p>
          </div>

          <span className="bg-secondary text-center font-code text-secondary-foreground">
            Published: {calculatePublishedTimestamp(course.published_at, true)}
          </span>
        </figcaption>
      </figure>
    </Link>
  );
};
