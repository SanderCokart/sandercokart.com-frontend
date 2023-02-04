import type {NextApiRequest, NextApiResponse} from 'next';
import {PostFrontMatter} from '@/types/data/FrontMatter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data: PostFrontMatter[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/frontmatter`).then((r) => r.json());

    const tags = data.flatMap((post) => {
        return post.tags;
    });

    const uniqueTags = Array.from(new Set(tags));

    res.status(200).json(uniqueTags);
}