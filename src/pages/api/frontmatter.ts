import {NextApiRequest, NextApiResponse} from 'next';
import {getSortedPostsWithFrontmatter} from '@/functions/api/frontmatter';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const sortedPostsWithFrontmatter = getSortedPostsWithFrontmatter();

    res.status(200).json(sortedPostsWithFrontmatter);
}