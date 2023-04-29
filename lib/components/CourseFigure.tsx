import type {CourseModel} from '@/types/ModelTypes';

import {courseRoute} from '@/routes/local-routes';
import c from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import calculatePublishedTimestamp from '@/functions/calculatePublishedTimestamp';

const CourseFigure = ({ course }: { course: CourseModel }) => {
    return (
        <Link href={courseRoute(course)}>
            <figure className="relative w-full h-full overflow-hidden">
                <Image fill
                       alt={course.title}
                       src={course.banner.original_url}
                       style={{ objectFit: 'cover' }}
                />
                <figcaption className={c(
                    'absolute inset-x-0 bottom-0 p-2',
                    'h-full transition-opacity',
                    'flex flex-col justify-end gap-1'
                )}>
                    <span className="text-xs w-min whitespace-nowrap label py-1 px-4">Published: {calculatePublishedTimestamp(course.published_at, true)}</span>
                </figcaption>
            </figure>
        </Link>
    );
};

export default CourseFigure;