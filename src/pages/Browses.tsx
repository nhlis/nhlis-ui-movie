import { useEffect, useState } from 'react';
import { Filter } from '@/components/Filter';
import type { FilterValue } from '@/types/filter';
import { PosterCard } from '@/components/PosterCards';
import { newly } from '@/data/newly';
import { useParams } from 'react-router';
import { sortsPathObject, type SortSlug } from '@/constants/sorts';
import { browsesPathObject, type BrowseSlug } from '@/constants/browses';
import { tagsPathObject, type TagSlug } from '@/constants/tags';
import { genresPathObject, type GenrePath } from '@/constants/genres';

function Browses() {
    const { browses } = useParams<{ browses: string }>();

    const browsesInfo = browsesPathObject[browses as BrowseSlug];

    if (!browsesInfo) return <div>browse not found</div>;

    const [filter, setFilter] = useState<FilterValue>(() => {
        const sort = sortsPathObject[browses as SortSlug];
        const tag = tagsPathObject[browses as TagSlug];
        const genre = genresPathObject[browses as GenrePath];

        return {
            type: undefined,
            tag: tag?.slug,
            genre: genre?.slug ? [genre?.slug] : undefined,
            language: undefined,
            sort: sort?.slug,
        };
    });

    useEffect(() => {
        const sort = sortsPathObject[browses as SortSlug];
        const tag = tagsPathObject[browses as TagSlug];
        const genre = genresPathObject[browses as GenrePath];

        setFilter({
            type: undefined,
            tag: tag?.slug,
            genres: genre?.slug ? [genre?.slug] : undefined,
            language: undefined,
            sort: sort?.slug,
        });
    }, [browses]);

    const handleFilterChange = (value: FilterValue) => {
        setFilter(value);
    };

    return (
        <>
            <article>
                <title>{browsesInfo.label}</title>
            </article>
            <div className="my-20 xl:my-30 text-white padding-page space-y-5">
                <h2 className=" text-lg md:text-2xl font-bold">{browsesInfo.label}</h2>
                <Filter value={filter} onChange={handleFilterChange} />
                <div className=" grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-5">
                    {newly.slice(0, 24).map((overview, index) => {
                        return <PosterCard key={index} overview={overview} />;
                    })}
                </div>
            </div>
        </>
    );
}

export default Browses;
