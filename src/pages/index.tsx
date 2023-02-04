import {GetStaticProps} from 'next';
import {PostFrontMatter} from '@/types/data/FrontMatter';
import Posts from '@/components/pageComponents/home/Posts';

interface HomePageProps {
    posts: PostFrontMatter[];
}

const Index = ({ posts }: HomePageProps) => {
    return (
        <main className="p-8 min-h-[calc(100vh-100px)]">
            <h1 className="text-4xl font-bold">Posts</h1>
            <Posts posts={posts}/>
        </main>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const posts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/frontmatter`).then(res => res.json());
    return { props: { posts }, revalidate: 1 };
};

export default Index;