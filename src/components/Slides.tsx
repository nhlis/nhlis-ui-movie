import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Keyboard, EffectFade } from 'swiper/modules';
import React, { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper/types';
import { cn } from '@/lib/utils';
import { Bookmark } from 'lucide-react';
import { images } from '@/constants';
import type { THeroSlides } from '@/types/hero-slide';
import { Image } from './Image';
import { Button } from './Button';
import { WatchButton } from './WatchButton';

export function Slides({ overviews }: { overviews: THeroSlides[] }) {
    const swiperRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div>
            <Swiper
                modules={[Pagination, Keyboard, Autoplay, EffectFade]}
                loop={true}
                effect={'fade'}
                fadeEffect={{ crossFade: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                keyboard={{
                    enabled: true,
                    onlyInViewport: true,
                }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setActiveIndex(swiper.realIndex);
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className=" !overflow-visible"
            >
                {overviews.map((overview: any, index) => (
                    <SwiperSlide key={index}>
                        <MemoSlide overview={overview} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Thumbnails overviews={overviews} swiperRef={swiperRef} activeIndex={activeIndex} className=" relative z-1 pt-5 sm:pt-0" />
        </div>
    );
}

function Thumbnails({ overviews, swiperRef, activeIndex, className }: { overviews: any[]; swiperRef: React.RefObject<SwiperType | null>; activeIndex: number; className?: string }) {
    return (
        <div className={cn(' flex items-center justify-center sm:justify-end gap-2 px-10', className)}>
            {overviews.map((overview, index) => (
                <button
                    key={index}
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                    className={cn(
                        ' aspect-square md:aspect-video w-7 md:w-15 h-full overflow-hidden rounded-full md:rounded-lg border-2 transition cursor-pointer',
                        'transition-all duration-1000 ease-in-out',
                        activeIndex === index ? 'border-white scale-105' : 'border-transparent scale-100'
                    )}
                >
                    <Image
                        src={`${overview.backdrop}=s3000`}
                        sources={[{ maxWidth: 40, srcSet: `${overview.poster}=s1000` }]}
                        className=" relative h-full w-full inset-0 sm:aspect-[4/3] lg:aspect-[5/3] xl:aspect-video 2xl:aspect-auto object-cover object-top sm:object-center xl:object-left"
                        fallback="assets/oops.png"
                    />
                </button>
            ))}
        </div>
    );
}

function Slide({ overview }: { overview: THeroSlides }) {
    return (
        <div className=" relative w-full h-full">
            <div className=" absolute w-full">
                <Image
                    src={`${overview.backdrop}=s3000`}
                    sources={[{ maxWidth: 40, srcSet: `${overview.poster}=s1000` }]}
                    className=" relative h-full w-full inset-0 sm:aspect-[4/3] lg:aspect-[5/3] xl:aspect-video 2xl:aspect-auto object-cover object-top sm:object-left"
                    fallback="assets/oops.png"
                />
                <div className=" block sm:hidden absolute inset-[-1px] bg-overlay-gradient-b-to-t pointer-events-none" />
                <div className=" hidden sm:block absolute inset-[-1px] bg-overlay-gradient-b-l-to-t-r pointer-events-none" />
                <div className=" hidden lg:block absolute inset-[-1px] opacity-20 bg-repeat bg-center pointer-events-none" style={{ backgroundImage: `url(${images.dotted})` }} aria-hidden="true" />
            </div>
            <div className=" relative grid grid-cols-12 grid-rows-[100px_100px_1fr] sm:grid-rows-[100px_1fr] pt-[50%] sm:pt-[17%] gap-5 padding-page">
                <div className=" col-start-4 col-span-6 sm:col-start-1 sm:col-span-4 md:col-span-3 row-start-2 sm:row-start-1 w-full h-full">
                    <Image src={`${overview.logo}=s800`} sources={[{ maxWidth: 30, srcSet: `${overview.logo}=s800` }]} className=" h-full w-full sm:w-auto object-contain" fallback="assets/oops.png" />
                </div>
                <div className=" col-start-2 col-span-10 row-start-3 sm:row-start-2 sm:col-start-1 sm:col-span-8 md:col-span-7 lg:col-span-6 xl:col-span-5 2xl:col-span-4 flex flex-col gap-5 text-center sm:text-start text-white text-xs">
                    <h1 className=" text-purple-300 text-base truncate min-h-5">{overview.original_title}</h1>
                    <div className=" flex flex-col gap-3">
                        <div className=" flex flex-wrap items-start justify-center sm:justify-start gap-2 text-xs overflow-hidden  font-medium">
                            <span className=" border border-purple-300 px-2 leading-normal rounded-sm">
                                <span className=" text-purple-300">IMDb:</span> 9.0
                            </span>
                            <span className=" flex-center h-5 px-2 leading-normal rounded-sm bg-linear-gradient text-black">Uncensored</span>
                            <span className=" border border-white px-2 leading-normal rounded-sm bg-white text-black">18+</span>
                            <span className=" border border-white px-2 leading-normal rounded-sm">Subtitled</span>
                            <span className=" border border-white px-2 leading-normal rounded-sm">Dubbed</span>
                        </div>
                        <div className=" hidden sm:flex flex-wrap gap-2 justify-center sm:justify-start">
                            {overview.genres
                                .slice(0, 10)
                                .sort((a: string, b: string) => a.localeCompare(b))
                                .map((genre: string, index: number) => (
                                    <span key={index} className="shrink-0 bg-white/20 px-4 py-2 rounded-sm capitalize">
                                        {genre.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                                    </span>
                                ))}
                        </div>
                    </div>
                    <div className=" hidden h-18 sm:line-clamp-3 text-sm sm:text-base">{overview.description}</div>
                    <div className=" w-full flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <WatchButton _id={overview._id} className=" main-button h-13 w-45 sm:w-70" />
                        <Button className=" h-13 w-13 rounded-lg border-2 border-white/25 bg-neutral-900/25 hover:bg-neutral-800/50 p-0 flex-center">
                            <Bookmark size={22} strokeWidth={2.5} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const MemoSlide = React.memo(Slide);
