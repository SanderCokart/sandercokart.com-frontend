import { Slides } from '@/app/components/slides';

import { getArticlePaths, getArticles } from '@/functions/server/api';

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <div className="flex flex-col">
      <Slides articles={articles} />
    </div>
  );
}

export async function generateStaticParams() {
  return await getArticlePaths();
}

export const revalidate = 60;
