import fs from 'fs';
import m from 'front-matter';
import {PostFrontMatter} from '@/types/data/FrontMatter';

const root = process.cwd();

export function getPostsWithFrontmatter() {
    const postFileNames = fs.readdirSync(`${root}/src/pages/blog/posts`);
    return postFileNames.map((filename) => {
        const source = fs.readFileSync(`${root}/src/pages/blog/posts/${filename}`, 'utf-8');
        const { attributes } = m<PostFrontMatter>(source);

        return { ...attributes, slug: filename.replace('.mdx', '') };
    });
}

export function getSortedPostsWithFrontmatter() {
    return getPostsWithFrontmatter().sort((a, b) => {
        return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
    });
}