import { cn } from '@/lib/utils';
import type { TPosterCard } from '@/types/poster-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useId } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type PosterCardsProps = {
    overviews: TPosterCard[];
};

export function PosterCards({ overviews }: PosterCardsProps) {
    const id = useId();
    const prevClass = `swiper-button-prev-${id}`;
    const nextClass = `swiper-button-next-${id}`;

    return (
        <div className="relative w-full">
            <Swiper
                modules={[Navigation]}
                navigation={{
                    nextEl: `.${nextClass}`,
                    prevEl: `.${prevClass}`,
                }}
                grabCursor={true}
                slidesPerView={2}
                spaceBetween={10}
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 12,
                    },
                    992: {
                        slidesPerView: 5,
                        spaceBetween: 14,
                    },
                    1024: {
                        slidesPerView: 6,
                        spaceBetween: 16,
                    },
                    1280: {
                        slidesPerView: 7,
                        spaceBetween: 18,
                    },
                    1536: {
                        slidesPerView: 8,
                        spaceBetween: 20,
                    },
                }}
                className=" !overflow-visible xl:!overflow-hidden"
            >
                {overviews.map((overview, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <PosterCard overview={overview} className=" text-xs md:text-sm" />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <ChevronLeft color="pink" size={45} className={` !hidden xl:!flex ${prevClass} absolute !top-[35%] !-left-13 !z-1 cursor-pointer`} />
            <ChevronRight color="pink" size={45} className={` !hidden xl:!flex ${nextClass} absolute !top-[35%] !-right-13 !z-1 cursor-pointer`} />
        </div>
    );
}

export function PosterCard({ overview, className }: { overview: TPosterCard; className?: string }) {
    return (
        <div className={cn(' text-white', className)}>
            <div className=" relative">
                <picture>
                    {/* <source media="(max-width: 30rem)" srcSet={`${overview.poster}=s500`} />
                    <source media="(max-width: 40rem)" srcSet={`${overview.poster}=s600`} />
                    <source media="(max-width: 48rem)" srcSet={`${overview.poster}=s700`} />
                    <source media="(max-width: 64rem)" srcSet={`${overview.poster}=s800`} />
                    <source media="(max-width: 80rem)" srcSet={`${overview.poster}=s900`} />
                    <source media="(max-width: 96rem)" srcSet={`${overview.poster}=s1000`} /> */}
                    <img src={`${overview.poster}=s1000`} loading="lazy" alt="backdrop" className=" inset-0 object-cover object-top rounded-xl overflow-hidden select-none" draggable={false} />
                </picture>
            </div>
            <div className=" pt-3 text-start">
                <h4 className=" font-medium truncate">{overview.original_title}</h4>
                <div className=" text-xs pt-1 text-neutral-500">
                    {overview.subtitle_languages.length > 0 && overview.dub_languages.length > 0 ? (
                        <span>Sub Dub</span>
                    ) : overview.subtitle_languages.length > 0 ? (
                        <span>Subtitled</span>
                    ) : overview.dub_languages.length > 0 ? (
                        <span>Dubbed</span>
                    ) : (
                        <span>Raw</span>
                    )}
                </div>
            </div>
        </div>
    );
}
