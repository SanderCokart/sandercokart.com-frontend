interface CourseArticlePageProps {
  params: {
    courseSlug: string;
    articleSlug: string;
  };
}

const CourseArticlePage = ({ params: { courseSlug, articleSlug } }: CourseArticlePageProps) => {
  return <main className="min-h-main" />;
};

export default CourseArticlePage;
