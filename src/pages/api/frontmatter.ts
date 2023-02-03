//api point return frontmatter in a map of the posts directory
import {NextApiRequest, NextApiResponse} from 'next';
import m from 'front-matter';
import fs from 'fs';
import {PostFrontMatter} from '@/types/data/FrontMatter';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const postFileNames = fs.readdirSync('./src/pages/blog/posts');

    const postsWithFrontmatter = postFileNames.map((filename) => {
        const source = fs.readFileSync(`./src/pages/blog/posts/${filename}`, 'utf-8');
        const { attributes } = m<PostFrontMatter>(source);

        return { ...attributes, slug: filename.replace('.mdx', '') };
    });

    const sortedPostsWithFrontmatter = postsWithFrontmatter.sort((a, b) => {
        return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
    });

    res.status(200).json(sortedPostsWithFrontmatter);
}