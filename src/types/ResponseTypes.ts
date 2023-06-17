import type {ArticleModel} from '@/types/ModelTypes';
import type {MDXRemoteSerializeResult} from 'next-mdx-remote';

export interface ArticleMDXResponse {
    article: Omit<ArticleModel, 'body'> & { body: MDXRemoteSerializeResult };
}