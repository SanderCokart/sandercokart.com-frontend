import type {NextApiRequest, NextApiResponse} from 'next';
import {getPostsWithFrontmatter} from '@/functions/api/frontmatter';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = getPostsWithFrontmatter();

    const tags = data.flatMap((post) => {
        return post.tags;
    });

    const uniqueTags = Array.from(new Set(tags));

    res.status(200).json(uniqueTags);
}