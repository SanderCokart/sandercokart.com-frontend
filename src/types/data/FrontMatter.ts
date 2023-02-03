export interface FrontMatter<T> {
    content: string;
    data: T;
    isEmpty: boolean;
    excerpt: string;
}

export interface PostFrontMatter {
    author: string;
    banner: string;
    datetime: Date;
    excerpt: string;
    tags: string[];
    slug: string;
    title: string;
}