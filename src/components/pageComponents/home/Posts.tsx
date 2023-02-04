import {Swiper, SwiperSlide} from 'swiper/react';
import Link from 'next/link';
import Image from 'next/image';
import {PostFrontMatter} from '@/types/data/FrontMatter';

interface PostsProps {
    posts: PostFrontMatter[];
}

export default function Posts(props: PostsProps) {
    return (
        <Swiper
            cssMode
            spaceBetween={50}
            breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1.5 },
                1024: { slidesPerView: 2.5 },
                1280: { slidesPerView: 2.5 },
                1536: { slidesPerView: 3.5 }
            }}
        >
            {props.posts.map((post, index) => (
                <SwiperSlide key={index}>
                    <div className="h-[300px]">
                        <Link href={`/blog/posts/${post.slug}`}>
                            <Post post={post}/>
                        </Link>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

interface PostProps {
    post: PostFrontMatter;
}

function Post(props: PostProps) {
    const { post: { slug, title, datetime, banner, tags, author, excerpt } } = props;
    return (
        <div className="min-h-full p-4">
            <figure>
                <Image fill style={{ objectFit: 'cover' }} className="absolute inset-0" src={banner} alt="banner"/>
                <figcaption className="absolute left-0 right-0 bottom-0 p-2 h-[120px] bg-black/80">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="line-clamp-3">{excerpt}</p>
                </figcaption>
            </figure>
        </div>
    );
}