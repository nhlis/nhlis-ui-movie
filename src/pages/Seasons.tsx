import { Button } from '@/components/Button';
import { Filter } from '@/components/Filter';
import { PosterCard } from '@/components/PosterCards';
import { routes } from '@/constants/routes/routes';
import { seasonsPathObject, type SeasonSlug } from '@/constants/seasons';
import { popularity } from '@/data/popularity';
import { getSeasonsFromYear } from '@/lib/getSeasonsFromYear';
import { formatSeason, parseSeason } from '@/lib/handleSeason';
import { cn } from '@/lib/utils';
import type { FilterValue } from '@/types/filter';
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';

function Seasons() {
    const { season } = useParams<{ season: string }>();
    const [openSeasons, setOpenSeasons] = useState<boolean>(false);

    const { refs: seasonsRefs, floatingStyles: seasonsStyles } = useFloating({
        open: openSeasons,
        onOpenChange: setOpenSeasons,
        placement: 'bottom-end',
        middleware: [offset(5), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    const parsed = season ? parseSeason(season) : null;

    const seasons = useMemo(() => getSeasonsFromYear(2000), []);

    if (!parsed) return <div>Invalid season</div>;

    const { value, year } = parsed;

    const { label, start, end } = seasonsPathObject[value as SeasonSlug];

    const startDate = new Date(year, start.month, start.day);
    const endDate = end.month < start.month ? new Date(year, end.month, end.day) : new Date(year, end.month, end.day);

    const [filter, setFilter] = useState<FilterValue>({
        type: undefined,
        tag: undefined,
        genres: undefined,
        language: undefined,
        start_date: startDate,
        end_date: endDate,
        sort: undefined,
    });

    useEffect(() => {
        setFilter({
            type: undefined,
            tag: undefined,
            genres: undefined,
            language: undefined,
            start_date: startDate,
            end_date: endDate,
            sort: undefined,
        });
    }, [season]);

    const handleFilterChange = (value: FilterValue) => {
        setFilter(value);
    };

    return (
        <>
            <article>
                <title>Seasons</title>
            </article>
            <div className="my-20 xl:my-30 text-white padding-page space-y-5">
                <div className=" flex items-center justify-between">
                    <h2 className=" text-lg md:text-2xl font-bold">
                        {label} {year}
                    </h2>
                    <div className=" text-xs font-light">
                        <Button ref={seasonsRefs.setReference} onClick={() => setOpenSeasons(!openSeasons)}>
                            Season
                        </Button>
                        {openSeasons && (
                            <div ref={seasonsRefs.setFloating} style={seasonsStyles} className="z-50">
                                <ul className=" bg-neutral-700 p-2 space-y-2 rounded-md m-h-100 min-h-50 h-82 overflow-y-scroll hide-scrollbar">
                                    {seasons.map((item, index) => {
                                        return (
                                            <li key={index} className=" w-full">
                                                <Link
                                                    to={routes.seasonsBuilder(formatSeason(item.season, item.year))}
                                                    onClick={() => setOpenSeasons(false)}
                                                    className={cn(
                                                        ' block p-2 hover:bg-neutral-500 rounded-md w-full hover:text-purple-300',
                                                        item.season === value && item.year === year && ' text-purple-300'
                                                    )}
                                                >
                                                    <span className=" capitalize">{item.season}</span> <span>{item.year}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <Filter value={filter} onChange={handleFilterChange} />
                <div className=" grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-5">
                    {popularity.slice(0, 24).map((overview, index) => {
                        return <PosterCard key={index} overview={overview} />;
                    })}
                </div>
            </div>
        </>
    );
}

export default Seasons;
