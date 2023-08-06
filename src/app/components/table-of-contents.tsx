'use client';

import { useClickOutside } from '@mantine/hooks';
import { AnimatePresence } from 'framer-motion';

import { useState } from 'react';
import Link from 'next/link';

import BasicAnimation from '@/components/FramerMotion/BasicAnimation';

import { heightAutoVariant } from '@/constants/animations/height';

interface TableOfContentsProps {
  ids: string[];
}

export const TableOfContents = ({ ids }: TableOfContentsProps) => {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => {
    setOpen(false);
  });

  const onClick = () => {
    setOpen(open => !open);
  };

  const close = () => {
    setOpen(false);
  };

  return (
    <div
      ref={ref}
      className="label relative w-1/2 whitespace-nowrap text-center font-digital text-xl transition-colors hover-focus:bg-secondary-active md:text-2xl">
      <button className="w-full" type="button" onClick={onClick}>
        Table of contents
      </button>
      <AnimatePresence>
        {open && (
          <BasicAnimation
            className="absolute left-0 right-0 top-full flex flex-col gap-2 overflow-hidden text-left"
            variants={heightAutoVariant}>
            <ul className="bg-muted">
              {ids.map(id => (
                <li key={id} className="px-4 hover-focus:bg-secondary">
                  <Link className="block" href={`#${id}`} onClick={close}>
                    {id.replace(/-/g, ' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </BasicAnimation>
        )}
      </AnimatePresence>
    </div>
  );
};
