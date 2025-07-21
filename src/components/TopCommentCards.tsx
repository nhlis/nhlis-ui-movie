import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { TTopCommentCard } from '@/types/top-comment';
import { Heart, Mars, MessageSquare, Venus, Transgender } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function TopCommentCards({ comments }: { comments: TTopCommentCard[] }) {
    return (
        <div>
            <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                grabCursor={true}
                loop={true}
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                    360: { slidesPerView: 1, spaceBetween: 10 },
                    768: { slidesPerView: 2, spaceBetween: 12 },
                    992: { slidesPerView: 3, spaceBetween: 14 },
                    1280: { slidesPerView: 4, spaceBetween: 16 },
                    1536: { slidesPerView: 5, spaceBetween: 18 },
                }}
            >
                {comments.map((comment, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <TopCommentCard comment={comment} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}

function TopCommentCard({ comment }: { comment: TTopCommentCard }) {
    const imgRef = useRef<HTMLImageElement>(null);
    const [bgUrl, setBgUrl] = useState<string | null>(null);

    useEffect(() => {
        const imgEl = imgRef.current;
        if (!imgEl) return;

        if (imgEl.complete) {
            setBgUrl(imgEl.src);
        } else {
            imgEl.onload = () => setBgUrl(imgEl.src);
        }
    }, []);

    return (
        <div className=" relative w-full min-h-45 text-white p-4 flex flex-col justify-between gap-auto rounded-xl overflow-hidden cursor-default">
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center filter blur-xs scale-110"
                    style={{
                        backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-black/0" />
                <div className="absolute inset-0 bg-black/75 scale-110" />
            </div>
            <div className="flex items-center justify-between z-1">
                <div className="flex flex-col items-start justify-center gap-2 flex-1 min-w-0">
                    <div className=" min-w-10 w-10">
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
                    <div className="flex items-center gap-1 w-full">
                        <span className="text-sm font-medium truncate max-w-[80%]">{comment.name}</span>
                        {comment.gender === 'male' ? <Mars size={15} stroke="blue" /> : comment.gender === 'female' ? <Venus size={15} stroke="pink" /> : <Transgender size={15} stroke="red" />}
                    </div>
                </div>
                <div className=" flex-shrink-0 w-10">
                    <picture>
                        {/* <source media="(max-width: 30rem)" srcSet={`${comment.poster}=s100`} />
                        <source media="(max-width: 40rem)" srcSet={`${comment.poster}=s120`} />
                        <source media="(max-width: 48rem)" srcSet={`${comment.poster}=s140`} />
                        <source media="(max-width: 64rem)" srcSet={`${comment.poster}=s160`} />
                        <source media="(max-width: 80rem)" srcSet={`${comment.poster}=s180`} />
                        <source media="(max-width: 96rem)" srcSet={`${comment.poster}=s200`} /> */}
                        <img ref={imgRef} src={`${comment.poster}=s1000`} alt="" loading="lazy" className=" rounded-md" />
                    </picture>
                </div>
            </div>
            <div className=" text-xs text-neutral-300 z-1 line-clamp-2">{comment.text}</div>
            <div className=" z-1 flex items-center gap-3">
                <div className=" flex-center gap-1">
                    <Heart size={20} />
                    <span>{comment.count_like}</span>
                </div>
                <div className=" flex-center gap-1">
                    <MessageSquare size={20} />
                    <span>{comment.count_child}</span>
                </div>
            </div>
        </div>
    );
}
