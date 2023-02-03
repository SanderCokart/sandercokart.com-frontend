import {useRouter} from 'next/router';

const Breadcrumbs = () => {
    const { pathname } = useRouter();
    const pathnames = pathname.split('/').filter((x) => x);
    return (
        <div className="flex flex-wrap gap-2">
            {pathnames.map((name, index) => (
                <div key={name}>
                    {index === 0 ? (
                        <a href="/" className="text-blue-500">
                            {name}
                        </a>
                    ) : (
                         <a href={`/${pathnames.slice(0, index + 1).join('/')}`} className="text-blue-500">
                             {name}
                         </a>
                     )}
                    {index < pathnames.length - 1 && <span className="text-gray-500">/</span>}
                </div>
            ))}
        </div>
    );
};

export default Breadcrumbs;