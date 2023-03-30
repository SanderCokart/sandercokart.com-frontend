import type {ComponentType} from 'react';
import type {IconBaseProps} from 'react-icons';

import Link from 'next/link';
import {IoPlanetSharp} from 'react-icons/io5';

interface NavButtonProps {
    href: string,
    Icon: ComponentType<IconBaseProps>,
    text: string
}

const NavButton = ({ Icon, text, href }: NavButtonProps) => (
    <Link className="flex flex-col items-center gap-1 w-full py-2 text-center hover:bg-primary dark:hover:bg-primary"
          href={href}>
        <Icon className="text-xl"/>
        <span className="text-xs">{text}</span>
    </Link>
);

export default function MobileNavigation() {
    return (
        <nav aria-label="mobile"
             className="flex md:hidden fixed bottom-0 left-0 w-full bg-primary dark:bg-primaryDark font-bold text-white">
            <NavButton Icon={IoPlanetSharp} href="/#discover" text="Discover"/>
            {/*<NavButton Icon={BsFillLightningFill} href="/#techstack" text={t('nav:tech-stack')}/>*/}
            {/*<NavButton Icon={FaComment} href="/#testimonials" text={t('nav:testimonials')}/>*/}
            {/*<NavButton Icon={FaEnvelope} href="/#contact" text={t('nav:contact')}/>*/}
        </nav>
    );
}