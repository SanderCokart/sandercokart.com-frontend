export interface ArticleTypeModel {
    id: number;
    name: string;
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

export interface ArticleModel {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    body: string;
    created_at?: string;
    updated_at?: string;
    published_at: string;
    article_type_id: number;
    type: ArticleTypeModel;
    banner: MediaModel;
}
