import DesktopNavigation from '@/app/(components)/(navigation)/DesktopNavigation';
import {localHomeRoute} from '@/routes/local-routes';
import Link from 'next/link';

import {ThemeToggle} from '@/components/ThemeToggle';

const Header = () => (
    <section
        className="mx-auto grid max-w-screen-xl grid-cols-[auto,40px] place-items-center gap-4 overflow-hidden px-4 py-2 font-digital font-bold text-white sm:min-h-[68px] md:grid-cols-[auto,1fr,40px]">
        <h1 className="justify-self-start whitespace-nowrap">
            <Link className="group flex flex-col text-base drop-shadow-lg" href={localHomeRoute('hero')}>
                <span className="block text-base !leading-none transition-colors  group-hover:text-secondary  sm:text-3xl">sandercokart.com</span>
                <span className="block self-end text-xs !leading-none  transition-colors sm:text-xl">Let's Learn...</span>
            </Link>
        </h1>
        <DesktopNavigation className="hidden flex-wrap justify-center gap-x-8 gap-y-1 justify-self-center text-2xl md:flex"/>
        <ThemeToggle className="mx-2 justify-self-end text-2xl"/>
    </section>
);
export default Header;