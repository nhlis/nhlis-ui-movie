import { useState } from 'react';
import { Search as SearchIcon, CircleX, Loader } from 'lucide-react';
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react-dom';

export function Search() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<string[]>([]);

    const { refs, floatingStyles } = useFloating({
        placement: 'bottom-start',
        middleware: [offset(8), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    const handleSearch = (value: string) => {
        setQuery(value);
        setLoading(true);

        setTimeout(() => {
            const fakeResults = value ? ['Result 1', 'Result 2', 'Result 3'].filter((item) => item.toLowerCase().includes(value.toLowerCase())) : [];

            setResults(fakeResults);
            setLoading(false);
        }, 1000);
    };

    const clearSearch = () => {
        setQuery('');
        setResults([]);
    };

    return (
        <div className="relative w-full">
            <div ref={refs.setReference} className="flex items-center gap-5 px-4 rounded-lg bg-purple-200/20 text-white focus-within:ring-2 focus-within:ring-white/60">
                <SearchIcon />
                <input type="text" value={query} onChange={(e) => handleSearch(e.target.value)} placeholder="Search" className="w-full h-10 appearance-none border-none outline-none" />
                {query && !loading && <CircleX className="cursor-pointer" onClick={clearSearch} />}
                {loading && <Loader className="animate-spin" />}
            </div>

            {query && !loading && <Result items={results} floatingRef={refs.setFloating} style={floatingStyles} />}
        </div>
    );
}

function Result({ items, floatingRef, style }: { items: string[]; floatingRef: (node: HTMLElement | null) => void; style: React.CSSProperties }) {
    return (
        <>
            {items && items.length > 0 ? (
                <div ref={floatingRef} style={style} className="mt-2 bg-slate-800 rounded shadow w-full min-w-100">
                    <ul className="divide-y divide-gray-200">
                        {items.map((item, index) => (
                            <li key={index} className="px-4 py-2 hover:bg-slate-400 cursor-pointer">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div ref={floatingRef} style={style} className="mt-2 px-4 py-2 text-sm bg-slate-800 rounded shadow w-full">
                    No results found.
                </div>
            )}
        </>
    );
}
