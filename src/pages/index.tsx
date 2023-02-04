import {GetStaticProps} from 'next';
import type {PostFrontMatter} from '@/types/data/FrontMatter';
import Posts from '@/components/pageComponents/home/Posts';
import {getSortedPostsWithFrontmatter} from '@/functions/api/frontmatter';

interface HomePageProps {
    posts: PostFrontMatter[];
}

const Home = ({ posts }: HomePageProps) => {
    return (
        <main className="p-8 min-h-[calc(100vh-100px)]">
            <h1 className="text-4xl font-bold">Posts</h1>
            <Posts posts={posts}/>
        </main>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const posts = getSortedPostsWithFrontmatter();
    return { props: { posts }, revalidate: 1 };
};

export default Home;