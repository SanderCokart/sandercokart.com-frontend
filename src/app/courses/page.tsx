import type {CourseModel} from '@/types/ModelTypes';
import type {CourseModelsResponse} from '@/types/ResponseTypes';

import {ApiRouteCourses} from '@/routes/api-routes';
import {localCourseRoute} from '@/routes/local-routes';
import Image from 'next/image';
import Link from 'next/link';
import {twJoin} from 'tailwind-merge';

import type {SuccessResponse} from '@/functions/shared/api';
import api from '@/functions/shared/api';
import calculatePublishedTimestamp from '@/functions/shared/calculatePublishedTimestamp';

const getCourses = async () => {
    const { data: { courses } } = await api.simpleGet<null, SuccessResponse<CourseModelsResponse>>(ApiRouteCourses());
    return courses;
};

const CoursesPage = async () => {
    const courses = await getCourses();

    return (
        <main className="min-h-main p-8">
            <div className={twJoin(
                'pointer-events-none grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
                '[&:hover_>*:hover]:opacity-100 [&:hover_>*]:opacity-75 [&_>*]:transition-opacity'
            )}>
                {courses.map((course) => (
                    <CourseFigure key={course.id} course={course}/>
                ))}
            </div>

        </main>
    );
};

const CourseFigure = ({ course }: { course: CourseModel }) => {
    return (
        <Link className="group pointer-events-auto" href={localCourseRoute(course.slug)}>
            <figure className="relative flex flex-col rounded border-2 border-secondary dark:border-secondaryDark">
                <div className="relative aspect-video h-full w-full overflow-hidden">
                    <Image fill
                           alt={course.title}
                           className="transition-transform group-hover:scale-110"
                           src={course.banner.original_url}
                           style={{ objectFit: 'cover' }}
                    />
                </div>

                <figcaption className={twJoin(
                    'flex h-full flex-col justify-between',
                    'bg-black/25 text-white'
                )}>
                    <h1 className={twJoin(
                        'label bg-secondary transition-opacity dark:bg-secondaryDark',
                        'line-clamp-2 font-code text-sm font-black capitalize text-black dark:text-white md:text-xl'
                    )}>
                        {course.title}
                    </h1>

                    <div className={twJoin(
                        'flex flex-col p-4',
                        'bg-bodyLightSecondary text-black dark:bg-bodyDarkSecondary dark:text-white'
                    )}>
                        <p className="line-clamp-5 font-code text-xs font-normal  md:text-base">
                            {course.description}
                        </p>
                    </div>

                    <span className={twJoin(
                        'label shadow-none',
                        'text-center font-code text-xs text-black'
                    )}>Published: {calculatePublishedTimestamp(course.published_at, true)}</span>
                </figcaption>
            </figure>
        </Link>
    );
};

export default CoursesPage;