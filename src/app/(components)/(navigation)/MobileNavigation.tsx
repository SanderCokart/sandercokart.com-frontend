import type { ComponentType, HTMLAttributes, ReactNode } from 'react';
import type { IconBaseProps } from 'react-icons';

import Link from 'next/link';
import { IoPlanetSharp } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';

interface NavButtonProps {
  href: string;
  Icon: ComponentType<IconBaseProps>;
  text: string;
}

const NavButton = ({ Icon, text, href }: NavButtonProps) => (
  <Link
    className="flex w-full flex-col items-center gap-1 py-2 text-center hover:bg-primary-active"
    href={href}>
    <Icon className="text-xl" />
    <span className="text-xs">{text}</span>
  </Link>
);

type MobileNavigationProps = HTMLAttributes<HTMLElement>;

export default function MobileNavigation({ className, ...restOfProps }: MobileNavigationProps) {
  return (
    <nav
      aria-label="mobile"
      className={twMerge(
        'fixed bottom-0 left-0 flex w-full bg-primary font-bold text-white',
        className
      )}
      {...restOfProps}>
      <NavButton href="/#discover" Icon={IoPlanetSharp} text="Discover" />
      {/*<NavButton Icon={BsFillLightningFill} href="/#techstack" text={t('nav:tech-stack')}/>*/}
      {/*<NavButton Icon={FaComment} href="/#testimonials" text={t('nav:testimonials')}/>*/}
      {/*<NavButton Icon={FaEnvelope} href="/#contact" text={t('nav:contact')}/>*/}
    </nav>
  );
}
