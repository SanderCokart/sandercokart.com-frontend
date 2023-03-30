import Link from 'next/link';

export default function DesktopNavigation(props: JSX.IntrinsicElements['nav']) {
    return (
        <nav aria-label="main"  {...props}>
            <Link className="hover:text-secondary leading-none" href="/#discover">Discover</Link>
            {/*<Link className="hover:text-secondary leading-none" href="/#techstack">{t('nav:tech-stack')}</Link>*/}
            {/*<Link className="hover:text-secondary leading-none" href="/#testimonials">{t('nav:testimonials')}</Link>*/}
            {/*<Link className="hover:text-secondary leading-none" href="/#contact">{t('nav:contact')}</Link>*/}
        </nav>
    );
}