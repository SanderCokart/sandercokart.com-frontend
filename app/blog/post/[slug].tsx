import {GetStaticProps} from 'next';

export default function Post({ post }) {
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
};

async function getPost(slug: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?slug=${slug}`);
    const posts = await res.json();
    return posts[0];
}

//getStaticProps typescript
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params;
    const post = await getPost(slug);
    return {
        props: {
            post,
        },
    };
}