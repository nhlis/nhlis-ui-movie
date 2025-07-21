import { cn } from '@/lib/utils';
import type { TPosterCard } from '@/types/poster-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useId } from 'react';

type TopPosterCardsProps = {
    overviews: TPosterCard[];
};

export function TopPosterCards({ overviews }: TopPosterCardsProps) {
    const id = useId();
    const prevClass = `swiper-button-prev-${id}`;
    const nextClass = `swiper-button-next-${id}`;

    return (
        <div className="relative w-full">
            <Swiper
                modules={[Navigation]}
                grabCursor={true}
                slidesPerView={1}
                spaceBetween={10}
                navigation={{
                    nextEl: `.${nextClass}`,
                    prevEl: `.${prevClass}`,
                }}
                breakpoints={{
                    420: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 12,
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 14,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 16,
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 18,
                    },
                    1536: {
                        slidesPerView: 6,
                        spaceBetween: 20,
                    },
                }}
            >
                {overviews.map((overview, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <TopPosterCard overview={overview} ranking={index + 1} className=" text-base md:text-xl" />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <ChevronLeft color="pink" size={45} className={` !hidden xl:!flex ${prevClass} absolute !top-[40%] !-left-13 !z-1 cursor-pointer`} />
            <ChevronRight color="pink" size={45} className={` !hidden xl:!flex ${nextClass} absolute !top-[40%] !-right-13 !z-1 cursor-pointer`} />
        </div>
    );
}

function TopPosterCard({ overview, ranking, className }: { overview: TPosterCard; ranking: number; className?: string }) {
    return (
        <div className={cn('relative text-white', className)}>
            <div className="w-full relative pb-[150%] group">
                {/* Viền ngoài */}
                <div className={cn('absolute inset-0 z-0', ranking % 2 === 0 ? 'clip-custom-shape-left' : 'clip-custom-shape-right', 'bg-purple-300')} />

                {/* Ảnh */}
                <div
                    className={cn(
                        'absolute inset-0 z-10 w-full h-full transition-transform duration-500 group-hover:scale-97',
                        ranking % 2 === 0 ? 'clip-custom-shape-left' : 'clip-custom-shape-right'
                    )}
                >
                    <picture>
                        {/* <source media="(max-width: 30rem)" srcSet={`${overview.poster}=s1000`} />
                        <source media="(max-width: 40rem)" srcSet={`${overview.poster}=s1200`} />
                        <source media="(max-width: 48rem)" srcSet={`${overview.poster}=s1400`} />
                        <source media="(max-width: 64rem)" srcSet={`${overview.poster}=s1600`} />
                        <source media="(max-width: 80rem)" srcSet={`${overview.poster}=s1800`} />
                        <source media="(max-width: 96rem)" srcSet={`${overview.poster}=s2000`} /> */}
                        <img src={`${overview.poster}=s1000`} loading="lazy" draggable={false} alt="backdrop" className="h-full w-full object-cover object-top select-none" />
                    </picture>
                </div>

                {/* Overlay */}
                <div
                    className={cn(
                        'absolute inset-0 z-20 bg-purple-200/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none',
                        ranking % 2 === 0 ? 'clip-custom-shape-left' : 'clip-custom-shape-right'
                    )}
                />
            </div>

            <div className="pt-3 flex items-center gap-2">
                <h3 className="w-20 italic text-center text-6xl bg-clip-text text-transparent font-bold bg-[linear-gradient(39deg,rgba(203,153,255,1),rgba(255,235,255,1))]">{ranking}</h3>

                <div className="overflow-hidden">
                    <h4 className="font-semibold truncate">{overview.original_title}</h4>
                    <div className=" text-xs pt-1 text-neutral-500">
                        {overview.subtitle_languages.length && overview.dub_languages.length ? (
                            <span>Sub Dub</span>
                        ) : overview.subtitle_languages.length ? (
                            <span>Subtitled</span>
                        ) : overview.dub_languages.length ? (
                            <span>Dubbed</span>
                        ) : (
                            <span>Raw</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
