import type {NextApiRequest, NextApiResponse} from 'next';
import type {PostFrontMatter} from '@/types/data/FrontMatter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data: PostFrontMatter[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/frontmatter`).then((r) => r.json());

    if (req.query.query) {
        return res.status(200).json([
            ...data.filter(post => {
                const regex = new RegExp(req.query.query as string, 'gi');

                return regex.test(post.author) || regex.test(post.excerpt) || regex.test(post.tags.join(' ')) || regex.test(post.slug) || regex.test(post.title);
            })
        ]);
    }

    return res.status(200).json({});
}