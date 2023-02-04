import type {NextApiRequest, NextApiResponse} from 'next';
import type {PostFrontMatter} from '@/types/data/FrontMatter';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data: PostFrontMatter[] = await axios.get<PostFrontMatter[]>(`${process.env.NEXT_PUBLIC_API_URL}/frontmatter`).then(r => r.data);

    const tags = data.flatMap((post) => {
        return post.tags;
    });

    const uniqueTags = Array.from(new Set(tags));

    res.status(200).json(uniqueTags);
}