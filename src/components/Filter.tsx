import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FunnelPlus, FunnelX } from 'lucide-react';

import { genres } from '@/constants/genres';
import { sorts } from '@/constants/sorts';
import { types } from '@/constants/type';
import { languages } from '@/constants/languages';

import type { FilterItem, FilterValue } from '@/types/filter';
import { cn } from '@/lib/utils';
import { tags } from '@/constants/tags';
import { Button } from './Button';

type FilterProps = {
    value: FilterValue;
    onChange: (value: FilterValue) => void;
};

export function Filter({ value, onChange }: FilterProps) {
    const [tempFilter, setTempFilter] = useState<FilterValue>(value);
    const [openFilter, setOpenFilter] = useState<boolean>(false);

    const handleSelect = (key: keyof FilterValue, slug: string | undefined) => {
        setTempFilter((prev) => {
            // Handle multi-select for genre
            if (key === 'genres') {
                const currentGenres = Array.isArray(prev.genres) ? prev.genres : [];

                if (!slug) return { ...prev, genres: [] }; // Clear all genres

                const exists = currentGenres.includes(slug);
                const updatedGenres = exists ? currentGenres.filter((g) => g !== slug) : [...currentGenres, slug];

                return { ...prev, genres: updatedGenres };
            }

            return { ...prev, [key]: slug };
        });
    };

    const handleSubmit = () => {
        onChange(tempFilter);
        setOpenFilter(false);
    };

    useEffect(() => {
        setTempFilter(value);
    }, [value]);

    return (
        <>
            <div className=" space-y-2">
                <Button onClick={() => setOpenFilter((prev) => !prev)} className=" text-xs font-light flex items-center justify-start gap-2">
                    {openFilter ? <FunnelX fill="violet" size={15} /> : <FunnelPlus size={15} />}
                    <h3>Filter</h3>
                </Button>

                <motion.div
                    initial={false}
                    animate={{
                        height: openFilter ? 'auto' : 0,
                        opacity: openFilter ? 1 : 0,
                    }}
                    transition={{
                        maxHeight: { duration: 0.6, ease: 'easeInOut' },
                        opacity: { duration: 0.4, ease: 'easeInOut' },
                    }}
                >
                    <div className="overflow-hidden flex flex-col gap-5 items-center border border-white/25 px-5 py-10 rounded-xl">
                        <div className="space-y-4 text-sm w-full">
                            <FilterRow label="Type:" items={types.slice()} selected={tempFilter.type} onSelect={(slug) => handleSelect('type', slug)} />
                            <FilterRow label="Language:" items={languages.slice()} selected={tempFilter.language} onSelect={(slug) => handleSelect('language', slug)} />
                            <FilterRow label="Genres:" items={genres.slice()} selected={tempFilter.genres} onSelect={(slug) => handleSelect('genres', slug)} multiSelect />
                            <FilterRow label="Tag:" items={tags.slice()} selected={tempFilter.tag} onSelect={(slug) => handleSelect('tag', slug)} />
                            <FilterRow label="Sort:" items={sorts.slice()} selected={tempFilter.sort} onSelect={(slug) => handleSelect('sort', slug)} />
                        </div>

                        <Button onClick={handleSubmit} className=" font-medium uppercase rounded-lg py-2 px-10 h-full">
                            Apply
                        </Button>
                    </div>
                </motion.div>
            </div>
        </>
    );
}

type FilterRowProps = {
    label: string;
    items: FilterItem[];
    selected?: string | string[];
    onSelect: (slug: string | undefined) => void;
    multiSelect?: boolean;
    disabled?: boolean;
};

function FilterRow({ label, items, selected, onSelect, multiSelect = false, disabled }: FilterRowProps) {
    const isSelected = (slug: string) => {
        if (multiSelect && Array.isArray(selected)) {
            return selected.includes(slug);
        }
        return selected === slug;
    };

    return (
        <div className="flex gap-5 lg:gap-10 items-start">
            <h4 className="w-[4rem] md:w-[5rem] text-end whitespace-nowrap">{label}</h4>
            <div className={cn('flex-1 flex gap-2 flex-wrap')}>
                <button
                    onClick={() => onSelect(undefined)}
                    disabled={disabled}
                    className={cn(
                        'px-2 py-0.5 rounded transition-colors duration-300 border min-w-[60px] text-center',
                        disabled
                            ? 'text-white/30 border-white/0 cursor-not-allowed'
                            : !selected || (Array.isArray(selected) && selected.length === 0)
                            ? 'text-purple-300 border-purple-300/50'
                            : 'text-white border-transparent hover:text-purple-300 cursor-pointer'
                    )}
                >
                    All
                </button>

                {items.map((item) => (
                    <button
                        key={item.slug}
                        onClick={() => onSelect(item.slug)}
                        disabled={disabled}
                        className={cn(
                            'px-2 py-0.5 rounded transition-colors duration-300 border min-w-[60px] text-center',
                            disabled
                                ? 'text-white/30 border-white/0 cursor-not-allowed'
                                : isSelected(item.slug)
                                ? 'text-purple-300 border-purple-300/50'
                                : 'text-white border-transparent hover:text-purple-300 cursor-pointer'
                        )}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
