import type { ArticleModel, CourseModel } from '@/types/ModelTypes';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface ArticleMDXResponse {
  article: Omit<ArticleModel, 'body'> & { body: MDXRemoteSerializeResult };
}

export interface ArticleModelResponse {
  article: ArticleModel;
}

export interface ArticleModelsResponse {
  articles: ArticleModel[];
}

export interface CourseModelResponse {
  course: CourseModel;
}

export interface CourseModelsResponse {
  courses: CourseModel[];
}
