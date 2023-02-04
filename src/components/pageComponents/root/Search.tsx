import {FaSearch, FaTimes} from 'react-icons/fa';
import {useDebouncedValue} from '@mantine/hooks';
import useSWR from 'swr';
import type {PostFrontMatter} from '@/types/data/FrontMatter';
import Link from 'next/link';
import Image from 'next/image';
import {useState, useRef, MouseEvent} from 'react';
import axios from 'axios';

function SearchNotification(props: { text: string }) {
    return <div className="bg-black rounded-b-2xl absolute top-full left-0 min-h-[100px] max-h-[60vh] overflow-auto w-full grid place-items-center">
        <h1 className="text-center text-2xl font-bold">
            {props.text}
        </h1>
    </div>;
}

function Results({ search, debounced, reset, autoFocus }: { search: string, reset: () => void, debounced: string, autoFocus: () => void }) {
    const { data: searchResults } = useSWR<PostFrontMatter[]>(debounced ? `${process.env.NEXT_PUBLIC_API_URL}/search?query=${debounced}` : null, (url) => axios.get(url).then((res) => res.data));

    const onClick = () => {
        reset();
    };

    if (!search.length) return null;

    if (search !== debounced && !searchResults?.length) return <SearchNotification text="Searching..."/>;

    if (!searchResults?.length) return <SearchNotification text="No results found"/>;

    return (
        <ul className="bg-black rounded-b-2xl absolute top-full left-0 min-h-[100px] max-h-[60vh] overflow-auto w-full p-2">
            {searchResults?.map((result) => (
                <li key={result.slug}>
                    <Link href={`/blog/posts/${result.slug}`} onClick={onClick} className="grid grid-cols-[150px,1fr] place-items-center gap-2 p-2">
                        <Image width="150" height="150" src={result.banner} alt="Banner"/>
                        <div className="grid gap-2">
                            <h1>{result.title}</h1>
                            <p className="line-clamp-2">{result.excerpt}</p>
                            <div className="flex gap-2">
                                {result.tags.map((tag) => (<span className="rounded-2xl px-2 text-xs font-bold uppercase bg-accent">{tag}</span>))}
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

function Tags({ setSearchTags, autoFocus }: { setSearchTags: (tag: string) => void, autoFocus: () => void }) {
    const { data } = useSWR<string[]>(`${process.env.NEXT_PUBLIC_API_URL}/tags`, (url) => axios.get(url).then((res) => res.data));

    const onClick = (e: MouseEvent, tag: string) => {
        e.preventDefault();
        setSearchTags(tag);
        autoFocus();
    };

    return (
        <div className="absolute top-full flex h-full w-full flex-wrap items-center gap-2 border-b bg-black px-2">
            {data?.map((tag) => (
                <span className="cursor-pointer rounded-2xl px-2 text-sm font-bold uppercase bg-accent hover:bg-hover"
                      onMouseDown={(e) => onClick(e, tag)}>{tag}</span>
            ))}
        </div>
    );
}

export default function Search() {
    const [open, setOpen] = useState(false);
    return (
        <>
            {open && <SearchBox/>}
            <button onClick={() => setOpen(prev => !prev)} className="grid col-start-3 cursor-pointer place-items-center justify-self-end px-4 hover:bg-hover">
                <FaSearch/>
            </button>
        </>
    );
}

const SearchBox = () => {
    const [search, setSearch] = useState('');
    const [showTags, setShowTags] = useState(false);
    const [debounced] = useDebouncedValue(search, 500);
    const ref = useRef<HTMLInputElement>(null);

    const reset = () => {
        setSearch('');
        setShowTags(false);
    };

    const setSearchTags = (tag: string) => {
        setSearch(tag);
    };

    const autoFocus = () => {
        ref.current?.focus();
    };

    return (
        <div className="relative grid h-full bg-black w-sm">
            <FaSearch className="absolute top-1/2 left-0 -translate-y-1/2"/>
            <input type="search"
                   onBlur={() => setShowTags(false)}
                   onFocus={() => setShowTags(true)}
                   ref={ref}
                   onChange={(e) => setSearch(e.target.value)}
                   value={search}
                   autoFocus
                   placeholder="Search..."
                   className="border-b-2 border-white pl-6 font-bold bg-accent focus:outline-none"/>
            <button onClick={reset} className="absolute top-1/2 right-0 grid h-full -translate-y-1/2 cursor-pointer place-items-center border-b-2 px-4 bg-hover focus:outline-none">
                <FaTimes/>
            </button>
            <Results autoFocus={autoFocus} search={search} debounced={debounced} reset={reset}/>
            {!search && showTags && <Tags setSearchTags={setSearchTags} autoFocus={autoFocus}/>}
        </div>
    );
};