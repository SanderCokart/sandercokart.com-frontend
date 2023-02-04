import Navigation from '@/components/pageComponents/root/Navigation';
import Search from '@/components/pageComponents/root/Search';

export default function Header() {
    return (
        <header className="sm:relative sm:sticky sm:top-0 sm:bg-accent z-10 flex grid grid-cols-3">
            <Navigation/>
            <Search/>
        </header>
    );
}