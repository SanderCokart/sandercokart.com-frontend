import {PropsWithChildren} from 'react';
import Link from 'next/link';
import {FaArrowLeft} from 'react-icons/fa';

function GoBack() {
    return (
        <div className="absolute right-[calc(100%+20px)] top-12 w-min">
            <Link href="/" className="block rounded-full bg-red-900 px-4 py-2 font-bold text-white no-underline hover:bg-red-700">
                <FaArrowLeft/>
            </Link>
        </div>
    );
}

const PostLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="relative mx-auto prose dark:prose-invert sm:prose-sm md:prose-md lg:prose-lg xl:prose-xl 2xl:prose-2xl min-h-[calc(100vh-100px)] pt-8">
            <GoBack/>
            <article>
                {children}
            </article>
        </div>
    );
};

export default PostLayout;