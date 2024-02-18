import React, { cache } from 'react';

import type { CourseModel } from '@/types/ModelTypes';

import { ComingSoon } from '@/components/coming-soon';

import { API } from '@/functions/shared/new-api';
import { cn } from '@/functions/shared/utils';

import { ApiRouteCourses } from '@/routes/api-routes';

import { CourseFigure } from '@/app/courses/course-figure';

const getCourses = cache(async () => {
  return await API.get<CourseModel[]>(ApiRouteCourses());
});

const Courses = async ({ courses }: { courses: CourseModel[] }) => {
  if (courses.length === 0) return <ComingSoon />;

  return courses.map(course => <CourseFigure key={course.slug} course={course} />);
};

const CoursesPage = async () => {
  const { data: courses, errors } = await getCourses();

  if (errors) throw new Error(errors.message);

  return (
    <main className="">
      <div className=" grid grid-cols-3 place-items-center bg-secondary">
        <h1 className="col-start-2 text-center font-digital text-4xl">Courses</h1>
        <div className="font-digital text-4xl">{courses.length} Courses</div>
      </div>
      <div
        className={cn(
          'pointer-events-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
          '[&:hover_>*:hover]:opacity-100 [&:hover_>*]:opacity-75 [&_>*]:transition-opacity',
        )}>
        <Courses courses={courses} />
      </div>
    </main>
  );
};

export default CoursesPage;
