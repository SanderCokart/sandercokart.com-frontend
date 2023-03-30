import type {ArticleModel} from '@/types/ModelTypes';
import type {GetStaticProps} from 'next';

import axios from '@/functions/axios';

interface BlogPostPageProps {
    post: ArticleModel;
    data: any;
}

const BlogPostPage = ({ post, data }: BlogPostPageProps) => {
    console.log(data);
    return (
        <div>
            <pre>
                {JSON.stringify(post, null, 2)}
            </pre>
        </div>
    );
};

export default BlogPostPage;

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await axios.simpleGet('/articles');

    return { props: { data, post: {} } };
};

export const getStaticPaths = async () => {
    const { data } = await axios.simpleGet('/articles/paths');

    const paths = data.map((post: ArticleModel) => ({
        params: { slug: post.slug },
    }));

    return { paths, fallback: false };
}
