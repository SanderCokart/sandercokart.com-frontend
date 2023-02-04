import {GetStaticProps} from 'next';
import type {PostFrontMatter} from '@/types/data/FrontMatter';
import Posts from '@/components/pageComponents/home/Posts';
import axios from 'axios';

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
    const posts = await axios.get<PostFrontMatter[]>(`${process.env.NEXT_PUBLIC_API_URL}/frontmatter`).then(res => res.data);
    return { props: { posts }, revalidate: 1 };
};

export default Index;