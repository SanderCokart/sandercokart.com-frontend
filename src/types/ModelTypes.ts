import type { ArticleType } from '@/types/CommonTypes';

export interface ArticleTypeModel {
  id: number;
  name: ArticleType;
}

interface MediaModel {
  //required
  id: number;
  model_type: string;
  model_id: number;
  disk: string;
  file_name: string;
  original_url: string;
  preview_url: string;
  //optional
  uuid?: string;
  collection_name?: string;
  name?: string;
  mime_type?: string;
  conversions_disk?: string;
  size?: number;
  manipulations?: any[];
  custom_properties?: any[];
  generated_conversions?: any[];
  responsive_images?: any[];
  order_column?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface BaseArticleModel {
  id: number;
  title: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
  published_at: string;
  banner: MediaModel;
}

export interface ArticleModel extends BaseArticleModel {
  description: string;
  body: string;
  article_type_id: number;
  type: ArticleTypeModel;
}

export interface CourseModel {
  id: number;
  title: string;
  description: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  articles_count: number;
  slug: string;
  banner: MediaModel;
  articles: ArticleModel[];
}

export interface Models {
  articles: {
    model: ArticleModel;
    routeParams: {
      type: ArticleType;
      slug: string;
    };
  };
  courses: {
    model: CourseModel;
    routeParams: {
      slug: string;
    };
  };
  media: {
    model: MediaModel;
  };
}
