import type { TTrending } from '@/types/trending';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function TrendingCards({ overviews }: { overviews: TTrending[] }) {
    return (
        <div className=" flex flex-col items-start justify-center gap-5 h-full w-full">
            {overviews.map((overview, index) => {
                return <TrendingCard key={index} overview={overview} ranking={index + 1} />;
            })}
        </div>
    );
}

function TrendingCard({ overview, ranking }: { overview: TTrending; ranking: number }) {
    return (
        <div className=" flex items-center justify-start gap-3 h-full w-full overflow-hidden">
            <h4 className=" text-neutral-500 font-bold text-base min-w-5">{ranking}.</h4>
            <div>
                {overview.trending === 'up' && <TrendingUp size={20} className="text-green-500" />}
                {overview.trending === 'down' && <TrendingDown size={20} className="text-pink-500" />}
                {overview.trending === 'flat' && <Minus size={20} className="text-gray-400" />}
            </div>
            <div className=" min-w-7 w-7">
                <picture>
                    {/* <source media="(max-width: 30rem)" srcSet={`${overview.poster}=s100`} />
                    <source media="(max-width: 40rem)" srcSet={`${overview.poster}=s120`} />
                    <source media="(max-width: 48rem)" srcSet={`${overview.poster}=s140`} />
                    <source media="(max-width: 64rem)" srcSet={`${overview.poster}=s160`} />
                    <source media="(max-width: 80rem)" srcSet={`${overview.poster}=s180`} />
                    <source media="(max-width: 96rem)" srcSet={`${overview.poster}=s200`} /> */}
                    <img src={`${overview.poster}=s1000`} loading="lazy" className=" rounded-sm" />
                </picture>
            </div>
            <h4 className=" text-xs font-medium line-clamp-2">{overview.original_title}</h4>
        </div>
    );
}
