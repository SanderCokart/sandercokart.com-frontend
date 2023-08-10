import Image from 'next/image';

import type { ImgHTMLAttributes } from 'react';
/*@ts-expect-error - MDXProvider is not typed*/
import type { MDXProvider } from '@mdx-js/react';
import type { ImageProps } from 'next/image';

import { Pre } from '@/components/MDXComponents';

import * as headings from './headings';
import * as table from './table';

const mdxComponents: React.ComponentProps<typeof MDXProvider>['components'] = {
  pre: Pre,
  // code: Code,
  ...table,
  ...headings,
  //  //    img {
  //   //      @apply mx-auto w-[50vmin] border-4 border-secondary dark:border-secondaryDark transition-colors;
  //   //    }
  img: (props: ImageProps) => (
    <span className="relative block aspect-[3/2] w-[50vmin]">
      <Image
        {...props}
        fill
        alt={props.alt as string}
        loading="lazy"
        sizes="(min-width: 640px) 640px, 100vw"
        style={{ objectFit: 'cover' }}
      />
    </span>
  )
};

export default mdxComponents;
