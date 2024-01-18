import Link from "next/link";
import { FaGithub, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="space-y-4 bg-primary p-2 text-primary-foreground sm:p-8"
      id="footer"
    >
      <section>
        <FooterNavigation />
      </section>
      <section>
        <Copyright />
      </section>
      <section>
        <Socials />
      </section>
    </footer>
  );
};

const FooterNavigation = () => {
  const pageLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Library", href: "/library" },
  ];

  const libraryLinks = [
    { name: "General", href: "/#techstack" },
    { name: "Courses", href: "/#techstack" },
    { name: "Shorts", href: "/#techstack" },
  ];

  return (
    <nav aria-label="footer navigation">
      <div className="flex justify-center gap-16 sm:gap-32">
        <div className="flex flex-col gap-4">
          <LinkList links={pageLinks} title="pages" />
        </div>
        <div className="flex flex-col gap-4">
          <LinkList links={libraryLinks} title="library" />
        </div>
      </div>
    </nav>
  );
};

type Link = {
  name: string;
  href: string;
};

const LinkList = ({ links, title }: { links: Link[]; title: string }) => {
  return (
    <>
      <h1 className="font-code font-bold capitalize text-secondary">{title}</h1>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              className="font-code font-bold transition-colors hover:text-secondary"
              href={link.href}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const Copyright = () => {
  const year = new Date().getFullYear();
  return (
    <p className="flex justify-center text-balance text-center">
      © Sander Cokart {year} All rights reserved.
    </p>
  );
};

const Socials = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub />,
      href: "https://github.com/sandercokart",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      href: "https://www.instagram.com/sandercokart/",
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      href: "https://youtube.com/SanderCokart",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      href: "https://twitter.com/sandercokart",
    },
  ];

  return (
    <ul className="flex justify-center gap-4">
      {socialLinks.map((link) => (
        <li key={link.name}>
          <Link
            aria-label={link.name}
            className="text-2xl transition-colors hover:text-secondary"
            href={link.href}
          >
            {link.icon}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Footer;
