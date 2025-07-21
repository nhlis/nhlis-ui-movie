import type { TNewCommentCard } from '@/types/new-comment';
import { Navigation, Autoplay } from 'swiper/modules';
import { CirclePlay } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef } from 'react';
import { useInView } from 'motion/react';
import { Swiper as SwiperType } from 'swiper';

export function NewCommentCards({ comments }: { comments: TNewCommentCard[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<SwiperType | null>(null);

    const inView = useInView(containerRef, {
        amount: 0.2,
        once: false,
    });

    useEffect(() => {
        if (swiperRef.current?.autoplay) {
            if (inView) {
                swiperRef.current.autoplay.start();
            } else {
                swiperRef.current.autoplay.stop();
            }
        }
    }, [inView]);

    return (
        <div ref={containerRef}>
            <Swiper
                modules={[Navigation, Autoplay]}
                direction="vertical"
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: true,
                    stopOnLastSlide: true,
                }}
                slidesPerView={4}
                className="h-75"
            >
                {comments.map((comment, index) => (
                    <SwiperSlide key={index}>
                        <NewCommentCard comment={comment} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

function NewCommentCard({ comment }: { comment: TNewCommentCard }) {
    return (
        <div className=" flex items-center justify-start gap-5 bg-neutral-800/50 px-5 py-3 w-full rounded-lg">
            <div className="min-w-10 w-10">
                <picture>
                    {/* <source media="(max-width: 30rem)" srcSet={`${comment.img}=s50`} />
                    <source media="(max-width: 40rem)" srcSet={`${comment.img}=s60`} />
                    <source media="(max-width: 48rem)" srcSet={`${comment.img}=s70`} />
                    <source media="(max-width: 64rem)" srcSet={`${comment.img}=s80`} />
                    <source media="(max-width: 80rem)" srcSet={`${comment.img}=s90`} />
                    <source media="(max-width: 96rem)" srcSet={`${comment.img}=s100`} /> */}
                    <img src={`${comment.img}=s100`} alt="User avatar" loading="lazy" className=" rounded-full" />
                </picture>
            </div>
            <div className=" flex flex-col items-start justify-start gap-1 w-full overflow-hidden">
                <div className="flex items-center gap-2 w-full">
                    <span className="text-sm font-medium text-nowrap">{comment.name}</span>
                    <span className=" text-xs text-neutral-500 truncate">{comment.text}</span>
                </div>
                <div className=" flex items-center justify-start gap-1 text-[0.6rem] font-bold text-neutral-500 w-full">
                    <CirclePlay size={13} className="min-w-1" />
                    <h4 className=" truncate w-full"> {comment.original_title}</h4>
                </div>
            </div>
        </div>
    );
}
