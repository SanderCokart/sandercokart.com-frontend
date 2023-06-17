import type {CourseModel} from '@/types/ModelTypes';

import {localCourseRoute} from '@/routes/local-routes';
import Image from 'next/image';
import Link from 'next/link';
import {twJoin} from 'tailwind-merge';

import calculatePublishedTimestamp from '@/functions/calculatePublishedTimestamp';

interface CourseFigureProps {
    course: CourseModel;
}

const CourseFigure = ({ course }: CourseFigureProps) => {
    return (
        <Link href={localCourseRoute(course.slug)}>
            <figure className="relative h-full w-full overflow-hidden">
                <Image fill
                       alt={course.title}
                       src={course.banner.original_url}
                       style={{ objectFit: 'cover' }}
                />
                <figcaption className={twJoin(
                    'absolute inset-x-0 bottom-0 p-2',
                    'h-full transition-opacity',
                    'flex flex-col justify-end gap-1'
                )}>
                    <span className="label w-min whitespace-nowrap px-4 py-1 text-xs">Published: {calculatePublishedTimestamp(course.published_at, true)}</span>
                </figcaption>
            </figure>
        </Link>
    );
};

export default CourseFigure;