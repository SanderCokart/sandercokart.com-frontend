import {FaHome} from 'react-icons/fa';
import Link from 'next/link';
import {IconType} from 'react-icons';

function NavItem({ text, Icon, link }: { Icon: IconType, text?: string, link: string }) {
    return (
        <li className="bg-accent hover:bg-red-700 sm:bg-transparent">
            <Link href={link} className="grid h-full w-full place-items-center sm:place-items-baseline sm:flex sm:items-center sm:gap-4 sm:px-4">
                <Icon className="m-0 p-0 text-xl"/>
                <span className="text-sm empty:hidden">{text}</span>
            </Link>
        </li>
    );
}

export default function Navigation() {
    return (
        <nav className="fixed flex justify-between font-bold bottom-0 h-[50px] w-full sm:static">
            <ul className="grid h-full grid-cols-1 sm:flex">
                <NavItem link="/" Icon={FaHome}/>
            </ul>
        </nav>
    );
}
