import {FaGithub, FaInstagram, FaYoutube, FaTwitter} from 'react-icons/fa';

import Link from 'next/link';

const Copyright = () => {
    const year = new Date().getFullYear();
    return (
        <p className="text-center text-sm md:text-xl">
            © Sander Cokart {year} All rights reserved.
        </p>
    );
};

const Footer = () => {
    return (
        <footer className="fond-bold flex flex-col justify-center bg-primary font-mono text-lg text-white"
                id="footer">
            <section className="mx-auto flex gap-32 p-8 text-base sm:text-xl">
                <nav aria-label="footer" className="hidden justify-between w-screen-sm md:flex">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-center text-secondary">Pages</h2>
                        <ul className="flex flex-col gap-2">
                            <li><Link className="hover:text-secondary" href="/#discover">Discover</Link></li>
                            <li><Link className="hover:text-secondary" href="/#discover">About me</Link></li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-center text-secondary">Library</h2>
                        <ul className="flex flex-col gap-2">
                            <li><Link className="hover:text-secondary" href="/#techstack">General</Link></li>
                            <li><Link className="hover:text-secondary" href="/#techstack">Courses</Link></li>
                            <li><Link className="hover:text-secondary" href="/#techstack">Shorts</Link></li>
                        </ul>
                    </div>
                    {/*<Link className="hover:opacity-70" href="/#techstack"></Link>*/}
                    {/*<Link className="hover:opacity-70" href="/#testimonials"></Link>*/}
                    {/*<Link className="hover:opacity-70" href="/#contact"></Link>*/}
                </nav>

            </section>
            <section className="mx-auto my-8">
                <Copyright/>
            </section>

            <section className="mx-auto mb-4 flex gap-8 text-4xl">
                <Link className="hover:text-secondary" href="https://github.com/sandercokart">
                    <FaGithub/>
                </Link>
                <Link className="hover:text-secondary" href="https://www.instagram.com/sandercokart/">
                    <FaInstagram/>
                </Link>
                <Link className="hover:text-secondary" href="https://youtube.com/SanderCokart">
                    <FaYoutube/>
                </Link>
                <Link className="hover:text-secondary" href="https://twitter.com/sandercokart">
                    <FaTwitter/>
                </Link>
            </section>
        </footer>
    );
};

export default Footer;