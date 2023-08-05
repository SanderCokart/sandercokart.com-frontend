import { Slides } from '@/app/components';

import { getArticlePaths, getArticles } from '@/functions/server/api';

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <main className="flex flex-col">
      <Slides articles={articles} />
    </main>
  );
}

export async function generateStaticParams() {
  return await getArticlePaths();
}

export const revalidate = 60;
