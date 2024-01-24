import Image from 'next/image';
import Link from 'next/link';

import type { CourseModel } from '@/types/ModelTypes';

import calculatePublishedTimestamp from '@/functions/shared/calculatePublishedTimestamp';
import { cn } from '@/functions/shared/utils';

import { localCourseRoute } from '@/routes/local-routes';

interface CourseFigureProps {
  course: CourseModel;
}

const CourseSlideItem = ({ course }: CourseFigureProps) => {
  return (
    <Link href={localCourseRoute(course.slug)}>
      <figure className="relative h-full w-full overflow-hidden">
        <Image fill alt={course.title} src={course.banner.original_url} style={{ objectFit: 'cover' }} />
        <figcaption
          className={cn(
            'absolute inset-x-0 bottom-0 p-2',
            'h-full transition-opacity',
            'flex flex-col justify-end gap-1',
          )}>
          <span className="w-min whitespace-nowrap bg-secondary px-4 py-1 font-code text-xs font-bold text-secondary-foreground">
            Published: {calculatePublishedTimestamp(course.published_at, true)}
          </span>
        </figcaption>
      </figure>
    </Link>
  );
};

export { CourseSlideItem };
