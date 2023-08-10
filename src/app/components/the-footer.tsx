import { FaGithub, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

import Link from 'next/link';

import type { HTMLAttributes } from 'react';

import { routes } from '@/constants/routes';
import { cn } from '@/functions/shared/utils';

interface TheFooterProps extends HTMLAttributes<HTMLElement> {}

export const TheFooter = ({ className, ...restOfProps }: TheFooterProps) => {
  return (
    <footer
      className={cn(
        'fond-bold flex flex-col justify-center bg-primary font-mono text-lg text-white',
        className
      )}
      id="footer"
      {...restOfProps}>
      <section className="mx-auto hidden gap-32 p-8 text-base sm:text-xl md:block">
        <FooterNavigation />
      </section>
      <section className="mx-auto my-8">
        <Copyright />
      </section>

      <section className="mx-auto mb-4 flex gap-8 text-4xl">
        <Socials />
      </section>
    </footer>
  );
};

function FooterNavigation() {
  return (
    <nav aria-label="footer" className="flex justify-between w-screen-sm">
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-secondary">Pages</h2>
        <ul className="flex flex-col gap-2">
          {routes.map(({ href, label }) => (
            <li key={href}>
              <Link className="transition-colors hover-focus:text-secondary" href={href}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-secondary">Library</h2>
        <ul className="flex flex-col gap-2">
          <li>
            <Link className="transition-colors hover-focus:text-secondary" href="/#general">
              General
            </Link>
          </li>
          <li>
            <Link className="transition-colors hover-focus:text-secondary" href="/#courses">
              Courses
            </Link>
          </li>
          <li>
            <Link className="transition-colors hover-focus:text-secondary" href="/#Tips">
              Tips
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const Copyright = () => {
  const year = new Date().getFullYear();

  return (
    <p className="text-center text-sm md:text-xl">© Sander Cokart {year} All rights reserved.</p>
  );
};

function Socials() {
  return (
    <>
      <Link
        className="transition-colors hover-focus:text-secondary"
        href="https://github.com/sandercokart">
        <FaGithub />
      </Link>
      <Link
        className="transition-colors hover-focus:text-secondary"
        href="https://www.instagram.com/sandercokart/">
        <FaInstagram />
      </Link>
      <Link
        className="transition-colors hover-focus:text-secondary"
        href="https://youtube.com/SanderCokart">
        <FaYoutube />
      </Link>
      <Link
        className="transition-colors hover-focus:text-secondary"
        href="https://twitter.com/sandercokart">
        <FaTwitter />
      </Link>
    </>
  );
}
