import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { cn } from '@/lib/utils';
import type { TBackdropCard } from '@/types/backdrop-card';
import { Image } from './Image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useId } from 'react';

type BackdropCardsProps = {
    overviews: TBackdropCard[];
};

export function BackdropCards({ overviews }: BackdropCardsProps) {
    const id = useId();
    const prevClass = `swiper-button-prev-${id}`;
    const nextClass = `swiper-button-next-${id}`;

    return (
        <div className=" relative">
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
                    640: { slidesPerView: 2, spaceBetween: 10 },
                    768: { slidesPerView: 3, spaceBetween: 12 },
                    1280: { slidesPerView: 4, spaceBetween: 14 },
                    1536: { slidesPerView: 5, spaceBetween: 16 },
                }}
                className="!overflow-visible lg:!overflow-hidden"
            >
                {overviews.map((overview: any, index: number) => (
                    <SwiperSlide key={index}>
                        <BackdropCard overview={overview} className=" text-xs md:text-sm" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <ChevronLeft color="black" size={15} className={` !hidden lg:!flex ${prevClass} absolute !top-[28%] !-left-5 !w-10 !h-10 p-3 bg-white !z-1 rounded-full cursor-pointer`} />
            <ChevronRight color="black" size={15} className={` !hidden lg:!flex ${nextClass} absolute !top-[28%] !-right-5 !w-10 !h-10 p-3 bg-white !z-1 rounded-full cursor-pointer`} />
        </div>
    );
}

export function BackdropCard({ overview, className }: { overview: TBackdropCard; className?: string }) {
    return (
        <div className={cn(' text-white', className)}>
            <div className=" relative">
                <Image
                    src={`${overview.backdrop}=s2000`}
                    sources={[{ maxWidth: 30, srcSet: `${overview.backdrop}=s2000` }]}
                    className=" inset-0 aspect-video object-cover object-top rounded-xl overflow-hidden select-none"
                />
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
