import Link from 'next/link';

import type { ReactNode } from 'react';

import { cn } from '@/functions/shared/utils';

interface NavButtonProps {
  href: string;
  icon: ReactNode;
  text: string;
}

export const NavButton = ({ icon, text, href }: NavButtonProps) => (
  <Link
    className={cn(
      'flex h-full flex-col place-items-center justify-center gap-1',
      'transition-colors hover:bg-accent hover:text-accent-foreground',
    )}
    href={href}>
    <span className="text-xl">{icon}</span>
    <span className="text-xs">{text}</span>
  </Link>
);
