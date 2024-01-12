import type { CourseModel } from "@/types/ModelTypes";
import type { CourseModelResponse } from "@/types/ResponseTypes";

import { ArticleFigure } from "@/app/[articleType]/ArticleFigure";
import { ApiRouteCourse } from "@/routes/api-routes";
import { twJoin } from "tailwind-merge";

import type { SuccessResponse } from "@/functions/shared/api";
import api from "@/functions/shared/api";

interface PageProps {
  params: {
    courseSlug: string;
  };
}

const getCourse = async (slug: CourseModel["slug"]) => {
  const {
    data: { course },
  } = await api.simpleGet<null, SuccessResponse<CourseModelResponse>>(
    ApiRouteCourse(slug),
  );

  return course;
};

const CoursePage = async ({ params: { courseSlug } }: PageProps) => {
  const {
    articles,
    articles_count,
    banner,
    created_at,
    description,
    id,
    published_at,
    slug,
    title,
    updated_at,
  } = await getCourse(courseSlug);

  return (
    <div className="flex">
      <main>
        <div className="grid grid-cols-3 place-items-center bg-secondary dark:bg-secondaryDark">
          <h1 className="col-start-2 text-center font-digital text-4xl font-bold ">
            {title}
          </h1>
          <div className="font-digital">
            {articles_count} article{articles_count > 1 ? "s" : ""}
          </div>
        </div>
        <div
          className={twJoin(
            "pointer-events-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
            "[&:hover_>*:hover]:opacity-100 [&:hover_>*]:opacity-75 [&_>*]:transition-opacity",
          )}
        >
          {articles.map((article) => (
            <ArticleFigure key={article.id} article={article} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CoursePage;
